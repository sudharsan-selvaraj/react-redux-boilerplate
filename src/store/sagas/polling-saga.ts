import { Channel, channel, EventChannel, eventChannel, Task } from "redux-saga";
import {
  call,
  CallEffect,
  cancel,
  CancelEffect,
  ChannelPutEffect,
  ChannelTakeEffect,
  fork,
  ForkEffect,
  put,
  take,
  TakeEffect,
} from "redux-saga/effects";
import { ReduxActionType } from "../../interfaces/redux";
import { logger } from "../utils";
import ReduxActionTypes from "../redux-action-types";

function getPollingChannel(secs: number): EventChannel<string> {
  return eventChannel((emit) => {
    const interval = setInterval(() => {
      emit("");
    }, secs);
    return () => {
      clearInterval(interval);
    };
  });
}

function* TaskScheduler(
  pollingChannel: EventChannel<string>,
  executionChannel: Channel<any>,
  tasks: TasksType,
): Generator<ChannelTakeEffect<string> | ChannelPutEffect<any>> {
  logger("Scheduler Ready");
  while (true) {
    yield take(pollingChannel);
    for (const task of tasks) {
      yield put(executionChannel, task);
    }
    logger("scheduled tasks");
  }
}

function* TaskExecutor(executionChannel: Channel<any>): Generator<any> {
  logger("Executor Ready");
  while (true) {
    const action = yield take(executionChannel);
    yield put(action as ReduxActionType<any>);
  }
}

function* TaskAggregator(tasks: TasksType) {
  logger("Aggregator Ready");
  while (true) {
    const { type, payload } = yield take([
      ReduxActionTypes.ADD_POLLING_TASK,
      ReduxActionTypes.REMOVE_POLLING_TASK,
    ]);
    logger(tasks);

    switch (type) {
      case ReduxActionTypes.ADD_POLLING_TASK:
        const task = tasks.find((task) => task.type === payload.type);

        if (!task) {
          tasks.push(payload);
        } else {
          logger("Duplicate task was scheduled");
        }
        break;
      case ReduxActionTypes.REMOVE_POLLING_TASK:
        // TODO: optimize following line
        const filteredTasks = tasks.filter(
          (task) => task.type !== payload.type,
        );
        tasks.length = 0;
        Array.prototype.push.apply(tasks, filteredTasks);
        break;
    }
    logger(tasks);
  }
}

const INTERVAL_IN_MS = 20000;

type TasksType = Array<ReduxActionType<any>>;

export default function* PollingSaga(): Generator<
  ForkEffect | TakeEffect | CallEffect | CancelEffect
> {
  const pollingChannel = getPollingChannel(INTERVAL_IN_MS);
  const tasks: TasksType = [];
  const executionChannel = channel();
  const taskAggregatorSaga = yield fork(TaskAggregator, tasks);
  const taskSchedulerSaga = yield fork(
    TaskScheduler,
    pollingChannel,
    executionChannel,
    tasks,
  );
  const taskExecutorSaga = yield fork(TaskExecutor, executionChannel);
  // Listen for event to stop polling
  yield take(ReduxActionTypes.POLLING_STOP);
  yield call(pollingChannel.close);
  yield cancel(taskAggregatorSaga as Task);
  yield cancel(taskSchedulerSaga as Task);
  yield cancel(taskExecutorSaga as Task);
}

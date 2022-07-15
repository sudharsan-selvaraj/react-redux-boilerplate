import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ThemeConfig } from "./interfaces/theme";
import { connect, useDispatch } from "react-redux";
import {
  initializeApp,
  triggerAppInitialized,
} from "./store/actions/app-action";
import { AppState } from "./store";
import { getSelectedTheme } from "./store/selectors/ui/theme-selector";
import { ThemeProvider } from "styled-components";

type PropsType = {
  theme: ThemeConfig;
  isAppInitialised: boolean;
};

function App(props: PropsType) {
  const { theme, isAppInitialised } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());

    /* Just to check if redux is working fine */
    setTimeout(() => {
      dispatch(triggerAppInitialized());
    }, 10000);
  }, []);

  if (!isAppInitialised) {
    return <div className="App">Loading...</div>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </ThemeProvider>
    );
  }
}

export default connect((state: AppState) => {
  return {
    theme: getSelectedTheme(state),
    isAppInitialised: state.ui.appInitialised,
  };
})(App);

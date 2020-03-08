import React from 'react'
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";

const Root = ({ store, cableApp }) => (
  <Provider store={store}>
    <HashRouter>
      <App store={store} cableApp={cableApp}/>
    </HashRouter>
  </Provider>
);

export default Root
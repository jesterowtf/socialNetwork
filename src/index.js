import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {App} from "./App.js";
import store from "./redux/redux-store";
import './index.css'
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById("root")
);

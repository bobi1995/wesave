import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

//SCREENS
import MainScreen from "../screens/MainScreen";

const history = createBrowserHistory();

const MainRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={MainScreen} exact />
    </Switch>
  </Router>
);

export default MainRouter;

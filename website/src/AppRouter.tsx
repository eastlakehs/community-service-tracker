import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Pages/home";
import Login from "./Pages/login";
import { Edit } from "./Pages/edit";
import { Table } from "./Pages/table";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/table">
          <Table />
        </Route>
        <Route path="/edit">
          <Edit />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;

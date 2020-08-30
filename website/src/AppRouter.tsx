import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Pages/home";
import Login from "./Pages/login";
import { EditController } from "./Pages/editController";
import { Table } from "./Pages/table";

import { ProfileController } from "./Pages/profileController";

import PageHeader from "./Components/Header/pageHeader";
import Footer from "./Components/Footer/footer";

const AppRouter = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-eastlake-grey font-text">
        <PageHeader />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/table">
            <Table />
          </Route>
          <Route path="/edit">
            <EditController />
          </Route>
          <Route path="/profile">
            <ProfileController />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;

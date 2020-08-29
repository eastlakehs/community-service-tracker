import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Pages/home";
import Login from "./Pages/login";
import { EditController } from "./Pages/editController";
import { Table } from "./Pages/table";
import Profile from "./Components/Profile/profile";
import Helmet from "./Components/Header/helmet";
import PageHeader from "./Components/Header/pageHeader";
import Footer from "./Components/Footer/footer";

const AppRouter = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-eastlake-grey font-text">
        <Helmet
          title="Login"
          description="Login page where users can login by receiving an OTP link in their email"
        />
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
            <Profile />
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

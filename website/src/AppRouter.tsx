import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routes
import Home from "./Pages/home";
import Login from "./Pages/login";
import { EditController } from "./Pages/editController";
import { Table } from "./Pages/table";
import { ProfileController } from "./Pages/profileController";

// Header/Footer
import PageHeader from "./Components/Header/pageHeader";
import Footer from "./Components/Footer/footer";

// Data sync
import { useSyncUserData } from "./Firebase/firestore/useUserData";
import { useSyncUserProfile } from "./Firebase/firestore/useUserProfile";

// React toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
  /** Real time web socket connection to keep profile and entry table in sync for the current user */
  useSyncUserProfile();
  useSyncUserData();
  /** Real time web socket connection to keep profile and entry table in sync for the current user */
  return (
    /** Toast message components with react toastify. Placed at the root of the app so that toasts
     * can persist even as components mount/unmount as the user navigates across the app
     */
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
    </>
  );
};

export default AppRouter;

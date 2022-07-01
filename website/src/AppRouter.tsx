import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routes
import Home from "./pages/home";
import Login from "./pages/login";
import { EditController } from "./pages/editController";
import { Table } from "./pages/table";
import { ProfileController } from "./pages/profileController";
import { Loading } from "./pages/loading";

// Admin Page
import { AdminPage } from "./pages/Admin";

// Header/Footer
import PageHeader from "./components/header/pageHeader";
import Footer from "./components/footer/footer";

// Data sync
import { useSyncUserData } from "./firebase/firestore/useUserData";
import { useSyncUserProfile } from "./firebase/firestore/useUserProfile";
import { useIsSignedIn } from "./firebase/link-auth/useIsSignedIn";

// React toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
  /** Real time web socket connection to keep profile and entry table in sync for the current user */
  useSyncUserProfile();
  useSyncUserData();

  /** Sync the current auth state with the redux slice signedInSlice.tsx */
  const signedInstate = useIsSignedIn();

  /** We should always return a loading spinner before we know the users auth state */
  if (signedInstate.signedIn === null) {
    return <Loading />;
  }
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
          <Routes>
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
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default AppRouter;

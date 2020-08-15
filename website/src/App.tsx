import React from "react";
import AppRouter from "./AppRouter";
import { Provider } from "react-redux";
import store from "./Redux/store";
const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;

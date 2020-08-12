import React from "react";
//import logo from "./logo.svg";

import PageHeader from "./Pages/Header/pageHeader";
import Body from "./Pages/Body/body"
import Footer from "./Pages/Footer/footer";
/*function App() {
  return (
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
  );
}
*/

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-eastlake-grey font-text">
      <PageHeader />
      <Body />
      <Footer />
    </div>
  );
};

export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import Login from "./components/Login";

function App() {
  useEffect(() => {
    const isAuthenticated = (() => {
      return localStorage.getItem("token") !== null;
    })();

    if (isAuthenticated) {
      window.location.replace("/");
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

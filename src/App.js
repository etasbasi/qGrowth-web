import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import "./App.scss";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const isAuthenticated = (() => {
  return localStorage.getItem("token") !== null;
})();

console.log(window.location.pathname);

if (
  !isAuthenticated &&
  !window.location.pathname.includes("/login") &&
  !window.location.pathname.includes("/register")
) {
  window.location.href = "/login";
}

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

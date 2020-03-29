import React from "react";
import {
  Chrome,
  Body,
  Content,
  Main,
  Header,
  HeaderItemText,
  HeaderItemWrapper,
  HeaderItem,
  HeaderItemIcon
} from "@zendeskgarden/react-chrome";
import { Button } from "@zendeskgarden/react-buttons";
import { withRouter } from "react-router-dom";

import SmallIcon from "../assets/icon-small.png";

let Navbar = ({ history }) => {
  function logout() {
    localStorage.removeItem("token");
    history.push("/login");
  }

  return (
    <Chrome style={{ height: "fit-content" }}>
      <Body>
        <Header style={{ height: "60px" }} isStandalone>
          <image src={SmallIcon} />
          <HeaderItemWrapper maxX>
            <span style={{ fontSize: "1.5em" }}>qGworth</span>
          </HeaderItemWrapper>
          <HeaderItem>
            <Button
              onClick={logout}
              secondary
              style={{ position: "relative", top: "-5px" }}
            >
              Logout
            </Button>
          </HeaderItem>
        </Header>
      </Body>
    </Chrome>
  );
};

Navbar = withRouter(Navbar);

export default function Dashboard() {
  return (
    <div className="dasbhoard">
      <Navbar />
      This is the dashboard
    </div>
  );
}

import React from "react";
import {
  Chrome,
  Body,
  Header,
  HeaderItemWrapper,
  HeaderItem
} from "@zendeskgarden/react-chrome";
import { Button } from "@zendeskgarden/react-buttons";
import { withRouter } from "react-router-dom";

import SmallIcon from "../assets/icon-small.png";

import tree1 from "../assets/tree1.png";
import tree2 from "../assets/tree2.png";

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
            <span style={{ fontSize: "1.5em" }}>qGrowth</span>
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
      <div
        style={{
          width: "900px",
          height: "700px",
          backgroundColor: "green",
          margin: "auto",
          borderRadius: "5px"
        }}
        className="garden"
      >
        <image src={tree1} height="400" width="400" alt="tree" />
      </div>
    </div>
  );
}

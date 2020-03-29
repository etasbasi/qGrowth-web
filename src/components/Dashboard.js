import React, { useState, useRef } from "react";
import {
  Chrome,
  Body,
  Header,
  HeaderItemWrapper,
  HeaderItem,
  Content
} from "@zendeskgarden/react-chrome";
import { Button } from "@zendeskgarden/react-buttons";
import { withRouter } from "react-router-dom";

import SmallIcon from "../assets/icon-small.png";

import tree1 from "../assets/tree1.png";

import tree2 from "../assets/tree2.png";

import "./_Dashboard.scss";

const treeImages = [tree1, tree2];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let Navbar = ({ history }) => {
  function logout() {
    localStorage.removeItem("token");
    history.push("/login");
  }

  return (
    <Chrome className="chrome" style={{ height: "" }}>
      <Body>
        <Header style={{ height: "60px" }} isStandalone>
          <img src={SmallIcon} alt="logo" width="50" height="50" />
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
        <Content>
          <Dashboard />
        </Content>
      </Body>
    </Chrome>
  );
};

export default withRouter(Navbar);

function Dashboard() {
  const [trees, setTrees] = useState([{ image: tree1, x: 10, y: 10 }]);
  const gardenRef = useRef();

  function addTree() {
    let newTree = {
      image: treeImages[randomNumber(0, 1)],
      x: randomNumber(0, gardenRef.current.clientWidth - 50),
      y: randomNumber(0, gardenRef.current.clientHeight - 100)
    };

    setTrees(trees.concat(newTree));
  }

  return (
    <div className="dashboard">
      {/* <button onClick={addTree}>Add tree</button> */}
      <div className="list" onClick={addTree}>
        <div className="list-item">
          <p>Yoga</p>
        </div>
        <div className="list-item">
          <p>Exercise</p>
        </div>
        <div className="list-item">
          <p>Read</p>
        </div>
        <div className="list-item">
          <p>Stretch</p>
        </div>
      </div>
      <div className="garden" ref={gardenRef}>
        {trees.map(tree => {
          return (
            <img
              style={{ top: tree.y + "px", left: tree.x + "px" }}
              className="logo-container"
              src={tree.image}
              alt="logo"
            />
          );
        })}
      </div>
    </div>
  );
}

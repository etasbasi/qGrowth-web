import React, { useState, useRef, useEffect, useCallback } from "react";
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
import axios from "axios";

import SmallIcon from "../assets/icon-small.png";

import tree1 from "../assets/tree1.png";
import tree2 from "../assets/tree2.png";
import tree3 from "../assets/tree3.png";
import tree4 from "../assets/tree4.png";
import tree5 from "../assets/tree5.png";
import tree6 from "../assets/tree6.png";
import tree7 from "../assets/tree7.png";
import tree8 from "../assets/tree8.png";
// import tree9 from "../assets/tree9.png";
// import tree10 from "../assets/tree10.png";
// import tree11 from "../assets/tree11.png";
// import tree12 from "../assets/tree12.png";
// import tree13 from "../assets/tree13.png";

import "./_Dashboard.scss";
const treeImages = [tree1, tree2, tree3, tree4, tree5, tree6, tree7, tree8];

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
  const [trees, setTrees] = useState([]);
  const gardenRef = useRef();

  async function addTree(image, index) {
    let newTree = {
      image,
      x: randomNumber(0, gardenRef.current.clientWidth - 50),
      y: randomNumber(0, gardenRef.current.clientHeight - 180)
    };

    console.log(newTree);

    setTrees(trees.concat(newTree));
    try {
      let imageType = await axios.post(
        "https://qgrowth-backend.herokuapp.com/trees",
        {
          x: newTree.x,
          y: newTree.y,
          type: index
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  const fetchTrees = useCallback(async () => {
    try {
      let result = await axios.get(
        "https://qgrowth-backend.herokuapp.com/trees"
      );
      let tempTrees = result.data.map(tree => {
        return {
          image: treeImages[tree.type],
          x: tree.x,
          y: tree.y
        };
      });

      setTrees(tempTrees);

      console.log(tempTrees);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchTrees();
  }, [fetchTrees]);

  let items = [
    { name: "singing", image: treeImages[0] },
    { name: "drawing", image: treeImages[1] },
    { name: "stretching", image: treeImages[2] },
    { name: "paingint", image: treeImages[3] },
    { name: "exercise", image: treeImages[4] },
    { name: "cleaning", image: treeImages[5] },
    { name: "coding", image: treeImages[6] },
    { name: "meditation", image: treeImages[7] }
  ];

  return (
    <div className="dashboard">
      <div className="list">
        {items.map((item, index) => (
          <div onClick={() => addTree(item.image, index)} className="list-item">
            <p>{item.name}</p>
            <img src={item.image} height="50" width="50" alt="" />
          </div>
        ))}
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

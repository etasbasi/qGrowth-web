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

import { Dots } from "@zendeskgarden/react-loaders";

import tree1 from "../assets/tree1.png";
import tree2 from "../assets/tree2.png";
import tree3 from "../assets/tree3.png";
import tree4 from "../assets/tree4.png";
import tree5 from "../assets/tree5.png";
import tree6 from "../assets/tree6.png";
import tree7 from "../assets/tree7.png";
import tree8 from "../assets/tree8.png";

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
          <ClassDashboard />
        </Content>
      </Body>
    </Chrome>
  );
};

export default withRouter(Navbar);

class ClassDashboard extends React.Component {
  state = {
    trees: [],
    loading: false
  };

  async fetchTrees() {
    this.setState({ loading: true });

    try {
      let result = await axios.get(
        "https://qgrowth-backend.herokuapp.com/trees"
      );
      let tempTrees = result.data.map(tree => {
        return {
          type: tree.type,
          x: tree.x,
          y: tree.y,
          level: tree.level,
          id: tree.id,
          key: Math.random()
        };
      });

      this.setState({ trees: tempTrees });
    } catch (e) {
      console.log(e);
    }

    this.setState({ loading: false });
  }

  constructor(props) {
    super(props);

    this.gardenRef = React.createRef();

    this.fetchTrees();

    this.fetchTrees = this.fetchTrees.bind(this);
    this.addTree = this.addTree.bind(this);
  }

  deleteAll = async () => {
    this.setState({ loading: true });
    try {
      await axios.delete("https://qgrowth-backend.herokuapp.com/trees");
      this.setState({ trees: [] });
    } catch (e) {
      console.log(e);
    }
    this.setState({ loading: false });
  };

  async addTree(index) {
    const { trees } = this.state;

    let x = randomNumber(0, this.gardenRef.current.clientWidth - 50);
    let y = randomNumber(0, this.gardenRef.current.clientHeight - 180);

    let filterTreesByType = trees.filter(tree => tree.type === index);
    let filterTreesByLevel = filterTreesByType.filter(tree => tree.level < 4);

    console.log(filterTreesByLevel);

    if (filterTreesByLevel.length === 0) {
      let result;
      try {
        result = await axios.post(
          "https://qgrowth-backend.herokuapp.com/trees",
          {
            x,
            y,
            type: index,
            level: 0
          }
        );

        let newTree = {
          type: index,
          x,
          y,
          level: 0,
          id: result.data.id,
          key: Math.random()
        };

        this.setState({ trees: trees.concat(newTree) });
      } catch (e) {
        console.log(e);
      }
    } else {
      let treeToUpdate = filterTreesByLevel[0];
      try {
        let res = axios.patch(
          `https://qgrowth-backend.herokuapp.com/trees/${treeToUpdate.id}`,
          { level: treeToUpdate.level + 1 }
        );

        treeToUpdate.level = treeToUpdate.level + 1;

        let tempTrees = trees;

        tempTrees[this.getTreeIndex(treeToUpdate.id)] = treeToUpdate;

        this.setState({ trees: tempTrees });
      } catch (e) {
        console.log(e);
      }
    }
  }

  getTreeIndex(id) {
    const { trees } = this.state;
    for (let i = 0; i < trees.length; i++) {
      if (trees[i].id === id) {
        return i;
      }
    }
  }

  render() {
    const { loading, trees } = this.state;

    if (loading)
      return (
        <Dots style={{ height: "100px", width: "100px", margin: "auto" }} />
      );

    const items = [
      { name: "singing", type: 0 },
      { name: "drawing", type: 1 },
      { name: "stretching", type: 2 },
      { name: "painting", type: 3 },
      { name: "exercise", type: 4 },
      { name: "cleaning", type: 5 },
      { name: "coding", type: 6 },
      { name: "meditation", type: 7 }
    ];

    return (
      <div className="dashboard">
        <div className="list">
          {items.map((item, index) => (
            <div
              onClick={() => this.addTree(index)}
              key={index}
              className="list-item"
            >
              <p>{item.name}</p>
              <img src={treeImages[item.type]} height="50" width="50" alt="" />
            </div>
          ))}
        </div>
        <div className="tutorial">
          Complete the activies on the left to grow trees in your garden.
        </div>
        <div className="garden" ref={this.gardenRef}>
          {trees.map((tree, index) => {
            return (
              <img
                key={Math.random()}
                style={{
                  top: tree.y + "px",
                  left: tree.x + "px",
                  height: `${120 + tree.level * 10}px`
                }}
                className="logo-container"
                src={treeImages[tree.type]}
                alt="logo"
              />
            );
          })}
        </div>

        <Button className="delete-button" onClick={this.deleteAll} isDanger>
          Remove all trees
        </Button>
      </div>
    );
  }
}

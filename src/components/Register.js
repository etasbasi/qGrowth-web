import React, { useState } from "react";
import { Field, Label, Hint, Input, Message } from "@zendeskgarden/react-forms";
import { Button } from "@zendeskgarden/react-buttons";
import axios from "axios";

import logo from "../assets/tree2.png";

import { Link } from "react-router-dom";

// 1. state - inside one component
// 2. props - gets passed to different compoentns

// getting props
export default function Register({ history }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setError("");
    setLoading(true);

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      setError("Please fill all the fields");
    } else {
      try {
        let result = await axios.post(
          `https://dropent-backend.herokuapp.com/users`,
          {
            firstName,
            lastName,
            email,
            password
          }
        );

        history.push("/login");
      } catch (e) {
        setError(e.toString());
      }
    }

    setLoading(false);
  }

  return (
    <div className="register">
      <form>
        <Field>
          <img className="logo-container" src={logo} />

          <div className="input-container">
            <Label>Fisrt Name</Label>
            <Input
              placeholder="FisrtName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-container">
            <Label>Last Name</Label>
            <Input
              placeholder="LastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>

          <div className="input-container">
            <Label>Email</Label>
            <Input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <Label>Password</Label>
            <Input
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <Button
            isPrimary
            disabled={loading}
            className="submit-button"
            onClick={() => onSubmit()}
          >
            Register
          </Button>
          <Link className="createlink" to="/login">
            Do you have already an account?
          </Link>
          <p className="error">{error}</p>
        </Field>
      </form>
    </div>
  );
}

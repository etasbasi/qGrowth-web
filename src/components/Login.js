import React, { useState } from "react";
import { Field, Label, Hint, Input, Message } from "@zendeskgarden/react-forms";
import { Button } from "@zendeskgarden/react-buttons";
import axios from "axios";

import { Link } from "react-router-dom";

import logo from "../assets/icon-big.png";

// 1. state - inside one component
// 2. props - gets passed to different compoentns

// getting props
export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setError("");
    setLoading(true);

    if (email === "" || password === "") {
      setError("The email or password is empty");
    } else {
      try {
        let result = await axios.post(
          `https://qgrowth-backend.herokuapp.com/auth`,
          { email, password }
        );

        localStorage.setItem("token", `Bearer ${result.data.accessToken}`);

        history.push("/");
      } catch (e) {
        setError(e.toString());
      }
    }

    setLoading(false);
  }

  return (
    <div className="login">
      <form>
        <Field>
          <img className="logo-container" src={logo} alt="logo" />
          <div className="slogan">Stay active during quarantine!</div>
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
            Submit
          </Button>
          <Link className="createlink" to="/register">
            Create an account
          </Link>

          <p className="error">{error}</p>
        </Field>
      </form>
    </div>
  );
}

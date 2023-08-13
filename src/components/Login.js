import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [creds, setCreds] = useState({ email: "", password: "" });
  let history = useHistory();

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://notesapi-production-c5e2.up.railway.app/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToekn);
      history.push("/");
      props.showAlert("Successfully loggedin","success")
    } else {
      props.showAlert("Invalid Credencials or User does not exists","danger")
    }
  };

  return (
    <div className="mt-4">
      <h1><b>Login</b></h1><br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"  
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={creds.email}
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={creds.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  const [creds, setCreds] = useState({ name:"", email: "", password: "", cpassword:"" });
  let history = useHistory();

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = creds
    const response = await fetch(`https://notesapi-production-c5e2.up.railway.app/api/auth/createuser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    if (json.success) {
      // localStorage.setItem("token", json.authToekn);
      history.push("/login");
      props.showAlert("Successfully Signedup","success")
    } else {
      props.showAlert("Something Went Wrong!","danger")
    }
  };
  return (
    <div className="container mt-4">
      <h1><b>Signup</b></h1><br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            minlength={5}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            minlength={5}
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
            onChange={onChange}
            minlength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={onChange}
            minlength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;

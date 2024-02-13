import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LogReg.css";

function Register() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const validateName = () => {
    if (!name) {
      setNameError("Please enter name");
      return false;
    } else if (!name.match(/^(?![\s.]+$)[a-zA-Z\s.]*$/)) {
      setNameError("Please enter valid name");
      return false;
    }
    return true;
  };
  const validatePassword = () => {
    if (!password) {
      setPasswordError("Please enter password");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password should be atleast 6 characters long");
      return false;
    } else if (
      !password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
    ) {
      setPasswordError(
        "Password should contain atleast one uppercase, one lowercase, one special character ,one number and atleast 6 characters."
      );
      return false;
    }
    return true;
  };
  const validateEmail = () => {
    if (!email) {
      setEmailError("Please enter email");
      return false;
    } else if (
      !email.match(
        /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/ //eslint-disable-line
      )
    ) {
      setEmailError("Please enter valid email");
      return false;
    }
    return true;
  };

  async function submit(e) {
    e.preventDefault();
    let isValid = true;
    const isValidName = validateName();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    console.log(isValidName, isValidEmail, isValidPassword);
    if (!(isValidName && isValidEmail && isValidPassword)) {
      isValid = false;
    }
    if (isValid) {
      try {
        await axios
          .post("http://localhost:3000/register", {
            name,
            email,
            password,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data === "notexist") {
              history("/home", { state: { id: email, name: name } });
            }
          })
          .catch((e) => {
            console.log(e);
            if (e.response.status === 403) {
              alert("User already exists");
            }
          });
      } catch (e) {
        alert("something went wrong");
        console.log(e);
      }
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">Register</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <form action="POST">
          <div className="input">
            <i className="fa fa-user icon"></i>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
            />
          </div>
          {nameError && <div className="error">{nameError}</div>}
          <div className="input">
            <i className="fa fa-envelope icon"></i>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email Address"
            />
          </div>
          {emailError && <div className="error">{emailError}</div>}
          <div className="input">
            <i className="fa fa-lock icon"></i>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            {showPassword ? (
              <i
                className="fa fa-eye-slash"
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            ) : (
              <i
                className="fa fa-eye"
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            )}
          </div>
          {passwordError && <div className="error">{passwordError}</div>}
          <div className="submit-container">
            <div className="submit">
              <input type="submit" onClick={submit} value="Register" />
            </div>
            <div className="change">
              <Link to="/" className="link">
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

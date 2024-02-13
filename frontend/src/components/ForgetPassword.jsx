import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LogReg.css";

function ForgetPassword() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [chnagedPassword, setChangedPassword] = useState(false);

  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Please enter password");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password should be atleast 6 characters long");
      return false;
    } else if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
    ) {
      setPasswordError(
        "Password should contain atleast one uppercase, one lowercase, one special character and one number"
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

  function submit(e) {
    e.preventDefault();
    let isValid = true;
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    if (!isValidEmail || !isValidPassword) {
      isValid = false;
    }
    if (isValid) {
      setChangedPassword(true);
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
      try {
        axios
          .post("https://login-signup-ntt8.onrender.com/resetpassword", {
            email,
            password,
          })
          .then((res) => {
            if (res.data === "success") {
              setChangedPassword(true);
              setEmail("");
              setPassword("");
              setEmailError("");
              setPasswordError("");
              alert("Password changed successfully");
              history("/");
            } else {
              setChangedPassword(false);
              alert("Email not registered");
            }
          })
          .catch((err) => {
            alert("Email not registered");
            console.log(err);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">Forget Password</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <form action="POST">
          <div className="input">
            <i className="fa fa-envelope"></i>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email Address"
              className="email"
              value={email}
            />
          </div>
          {emailError && <div className="error">{emailError}</div>}
          <div className="input">
            <i className="fa fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="New Password"
              className="password"
              value={password}
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
          {chnagedPassword ? (
            <div className="forgot-password">
              Password changed successfully{" "}
              <Link to="/" className="link">
                Login!
              </Link>
            </div>
          ) : (
            <div className="forgot-password">
              Don't have Account?{" "}
              <Link to="/register" className="link">
                Register!
              </Link>
            </div>
          )}
          <div className="submit-container">
            <div className="submit">
              <input type="submit" onClick={submit} value="Change Password" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;

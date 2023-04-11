import React, { useState } from "react";
import { useDispatch } from "react-redux";

import api from "../../api/loginApi";
import { LOGIN_FORM } from "../content/form";
import "./index.css";
import {
  resetState,
  signupState,
  loginSuccess,
  closeModal,
} from "../../actions";
import { USER_TYPE } from "../../constants";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!email) {
      setEmailError(LOGIN_FORM.EMAIL.REQUIRED_MESSAGE);
    } else if (!isValid) {
      setEmailError(LOGIN_FORM.EMAIL.ERROR_MESSAGE);
    } else {
      setEmailError(null);
    }

    return isValid;
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;
    const isValid = passwordRegex.test(password);

    if (!password) {
      setPasswordError(LOGIN_FORM.PASSWORD.REQUIRED_MESSAGE);
    } else if (!isValid) {
      setPasswordError(LOGIN_FORM.PASSWORD.ERROR_MESSAGE);
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      console.log(`${LOGIN_FORM.EMAIL.LABEL}: ${email}`);
      console.log(`${LOGIN_FORM.PASSWORD.LABEL}: ${password}`);
      // const response = await api.loginApi({
      //   customerType: USER_TYPE.CUSTOMER,
      //   email: email.value,
      //   loginCode: parseInt(code.value),
      //   rememberMe: check,
      // });
      // if (response.status !== StatusCodes.OK) {
      //   throw new Error(
      //     `Login API response status error: ${JSON.stringify(response)}`
      //   );
      // } else {
      //   dispatch(loginSuccess());
      // }
      dispatch(loginSuccess());
      dispatch(closeModal());
    }
  };

  return (
    <>
      <div className="login">
        <h2 className="title">Sign in to your account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className={emailError ? "error-input" : ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // type="email"
            placeholder={LOGIN_FORM.EMAIL.PLACE_HOLDER}
            id="email"
            name="email"
          />
          {emailError && <div className="error-email">{emailError}</div>}
          <label htmlFor="password">Password</label>
          <input
            className={passwordError ? "error-input" : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder={LOGIN_FORM.PASSWORD.PLACE_HOLDER}
            id="password"
            name="password"
          />
          {passwordError && (
            <div className="error-password">{passwordError}</div>
          )}
          <button id="submit" type="submit">
            Sign In
          </button>
        </form>
        <div className="set-state">
          <button
            className="link-signup"
            onClick={() => dispatch(signupState())}
          >
            Don't have an account? Sign up
          </button>
          <button
            className="link-password"
            onClick={() => dispatch(resetState())}
          >
            Forgot password
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

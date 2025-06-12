import React, { useState } from "react";
import "../css/login.css"; // using same CSS for consistency
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  signuperror,
  signupStart,
  signupSuccess,
} from "../redux/slice/authSlice";

const Signup = () => {
  const [Email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const navigate = useNavigate();
  const data = useSelector((store) => store);
  const dispatch = useDispatch();
  const hendelSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signupStart());
      const res = await axios.post(`${import.meta.env.VITE_BASEURL}/api/user/signup`, {
        email: Email,
        name,
        password,
        phone,
      },{
        withCredentials:true
      });
      console.log(res);
      dispatch(signupSuccess());

      navigate("/otp");
    } catch (error) {
      dispatch(signuperror(error));

      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-left" onSubmit={hendelSubmit}>
          <span className="cancel-link">Cancel</span>
          <h2>Create your iHerb account</h2>
          <p>Please fill in the details below to create your account.</p>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
          />
          <input
            type="email"
            value={Email}
            placeholder="Email address"
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            value={phone}
            placeholder="Mobile number"
            className="login-input"
            onChange={(e) => setphone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button className="continue-btn" type="submit">
            {" "}
            Create Account
          </button>
          <div className="help-text">Already have an account? Sign in</div>

          <p className="terms-text">
            By creating an account, you agree to our{" "}
            <span className="link">Terms and Conditions</span> and{" "}
            <span className="link">Privacy Policy</span>.
          </p>
        </form>

        <div className="login-right">
          <h3>Why join iHerb?</h3>
          <ul className="features-list">
            <li>Exclusive discounts and promotions</li>
            <li>Faster checkout experience</li>
            <li>Track your orders easily</li>
            <li>Earn Rewards and loyalty credits</li>
            <li>Save favorite products and more</li>
          </ul>

          <div className="ratings">
            <div>
              <strong>4.8 ★★★★★</strong>
              <br />
              iHerb
              <br />
              Store Reviews
            </div>
            <div>
              <strong>4.8 ★★★★★</strong>
              <br />
              Google
              <br />
              Customer Reviews
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useEffect, useState } from "react";
import { MailIcon, PasswordIcon } from "../assests/svgIcons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { saveUser } from "../api";
import { toast } from "react-toastify";

const SignIn = () => {
  const { setUserId } = useAuth();
  const [isSign, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (isSign) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            if (user.uid) {
              toast.success("User Login successfully");
              await saveUser(user.uid, { name, email, password });

              setUserId(user.uid);
              localStorage.setItem("userID", user.uid);
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message);
          });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            if (user.uid) {
              toast.success("User created successfully");
              await saveUser(user.uid, { name, email, password });
              setUserId(user.uid);
              localStorage.setItem("userID", user.uid);
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form className="form_container">
      <div className="logo_container" />
      <div className="title_container">
        <p className="title">Login to your Account</p>
      </div>
      <br />
      {!isSign && (
        <div className="input_container">
          <label className="input_label" htmlFor="email_field">
            Name
          </label>
          <MailIcon />
          <input
            placeholder="name"
            title="name"
            name="input-name"
            type="text"
            className="input_field"
            id="email_field"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}
      <div className="input_container">
        <label className="input_label" htmlFor="email_field">
          Email
        </label>
        <MailIcon />
        <input
          placeholder="name@mail.com"
          title="email"
          name="input-name"
          type="text"
          className="input_field"
          id="email_field"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input_container">
        <label className="input_label" htmlFor="password_field">
          Password
        </label>
        <PasswordIcon />
        <input
          placeholder="Password"
          title="password"
          name="input-name"
          type="password"
          className="input_field"
          id="password_field"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button title="Sign In" className="sign-in_btn" onClick={handelSubmit}>
        <span>{isSign ? "Sign In" : "Sign Up"}</span>
      </button>

      <p className="note">
        {isSign ? "does have a account ?" : "Already have an account ?"}
        <span
          style={{ fontWeight: "600", color: "blue", cursor: "pointer" }}
          onClick={() => {
            setEmail("");
            setPassword("");
            setName("");
            setIsSignIn((prev) => !prev);
          }}
        >
          {isSign ? "Sign Up" : "Sign In"}
        </span>
      </p>
    </form>
  );
};

export default SignIn;

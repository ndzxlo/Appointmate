"use client";
import "../login/login.css";
import Button from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import signUp from "../../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import addData from "../../../firebase/firestore/AddData";

export default function Page() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const userDB = async () => {
    const data = {
      name: name,
      email: email,
    };
    const { result, error } = await addData("users", data);

    if (error) {
      return console.log(error);
    }
  };

  const handleAuthError = (error) => {
    const errorCode = error.code || "Unknown error";

    alert(`Error: ${errorCode}`);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    userDB();

    try {
      const { result, error } = await signUp(email, password);

      if (error) {
        handleAuthError(error);
      } else {
        setName("");
        setEmail("");
        setPassword("");
        console.log(result);
        router.push("/dashboard/appointment-type");
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  return (
    <div className="parent">
      <div className="side-info">
        <h1>Welcome to AppointMate</h1>
        <p>if already have an account, click below to log in</p>
        <Button icon={faArrowLeft} onClick={() => router.push("/login")}>
          log in
        </Button>
      </div>
      <div className="container" id="container">
        <form onSubmit={handleSignup}>
          <h1>Sign up</h1>
          <Button icon={faGoogle} className="acc-btn">
            sign up with Google
          </Button>
          <hr className="hr-text" data-content="OR" />
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit"> Sign Up </Button>
        </form>
      </div>
    </div>
  );
}

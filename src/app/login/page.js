"use client";
import "./login.css";
import Button from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import signIn from "../../../firebase/auth/signIn";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleAuthError = (error) => {
    const errorCode = error.code || "Unknown error";

    alert(`Error: ${errorCode}`);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const { result, error } = await signIn(email, password);

      if (error) {
        handleAuthError(error);
      } else {
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
    <div>
      <h1 className="webName">AppointMate</h1>
      <div className="parent">
        <div className="container" id="container">
          <form onSubmit={handleSignIn}>
            <h3>log in to your account</h3>
            <Button className="acc-btn" icon={faGoogle}>
              log in with Google
            </Button>
            <hr className="hr-text" data-content="OR"></hr>
            <input
              type="email"
              placeholder="email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="lgn-btn">
              login
            </Button>
            <span>
              forgot password?
              <a href="*">reset</a>
            </span>
          </form>
        </div>
        <div className="side-info">
          <h1>Welcome Back</h1>
          <p>if you dont have an account yet sign up to create one</p>
          <Button
            className="log-sign-toggle"
            icon={faArrowRight}
            iconFirst={false}
            onClick={() => router.push("/signup")}
          >
            sign up
          </Button>
        </div>
      </div>
    </div>
  );
}

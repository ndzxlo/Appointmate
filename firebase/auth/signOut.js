import React from "react";
import { signOut, getAuth } from "firebase/auth";
import firebaseApp from "../fireBaseConfig";
import { useRouter } from "next/navigation";

const auth = getAuth(firebaseApp);
const router = useRouter();

const handleLogout = () => {
  signOut(auth)
    .then(() => {
      router.push("/login");
      console.log("logged out");
    })
    .catch((error) => {
      console.log("error");
    });
};

export default handleLogout;

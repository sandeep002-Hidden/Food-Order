import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  




  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uData = { userEmail, userPassword };

    try {
      console.log(uData);
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uData),
      });
      console.log("Waiting for res");
      const data = await res.json();
      console.log(data.token);
      localStorage.setItem("token", data.token);
      if (res.ok) {
        navigate("/");
        console.log("Login successful");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center ">
      <div className="h-fit w-fit m-8 border-2 border-purple-500 rounded-lg p-4">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col"
        >
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            placeholder="Enter Your Email id"
            className="border border-black rounded-lg block h-12 w-64 p-1 m-4"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="Enter Your Password"
            className="border border-black rounded-lg block h-12 w-64 p-1 m-4"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="submit"
            value="Enter"
            className="border border-black rounded-lg block px-5 py-2"
          />
        </form>
        <h2 className="text-center">
          Forgot your password?
          <a href="/forgetPassword" className="text-red-400">
            {" "}
            reset password{" "}
          </a>
        </h2>
        <h2 className="text-center">
          New here!
          <a href="/signUp" className="text-red-400">
            {" "}
            Create an account{" "}
          </a>
        </h2>
      </div>
    </div>
  );
}

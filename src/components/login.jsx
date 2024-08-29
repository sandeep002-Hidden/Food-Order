import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userEmail, setEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false);
  const [actualOtp, setActualOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (flag) {
      console.log(actualOtp)
      console.log(userOtp)
      if (userOtp == actualOtp) {
        const uData = { userEmail }
        try {
          const res = await fetch(`http://localhost:8000/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(uData),
          });
          const data = await res.json();
          console.log(data)
          localStorage.setItem("token", data.token);
          if (data.isAdmin === true) {
            navigate("/admin002");
          }
          if (res.ok) {
            navigate("/");
          } else {
            setMessage("Wrong userName or Password try again");
          }
        } catch (error) {
          console.log(error.message)
          setMessage("Error occur while verifying Your Information");
        }
      } else {
        setMessage("Wrong Otp");
      }
    } else {
      setFlag(true);
      const Email = { userEmail };
      const sendmail = async (email) => {
        try {
          const emailRes = await fetch(`http://localhost:8000/sendEmail`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Email),
          });
          const emailResponse = await emailRes.json();
          setActualOtp(emailResponse.Otp);
        } catch (error) {
          setMessage(
            "Error occur while sending email , try again after some time"
          );
          console.log(error);
        }
      };
      sendmail(userEmail);
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center ">
      <h1>{message}</h1>
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
            className="border border-black rounded-lg  h-12 w-64 p-1 m-4"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {flag && (
            <input
              type="text"
              name="userPassword"
              placeholder="Enter Otp "
              className="border border-black rounded-lg block h-12 w-64 p-1 m-4"
              onChange={(e) => setUserOtp(e.target.value)}
              required
            />
          )}
          <button
            className="border border-black rounded-lg block px-5 py-2"
            onClick={handleSubmit}
          >
            {flag ? "Enter" : "Send Otp for Verification"}
          </button>
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

import React, { useState, useEffect } from "react";
import logo1 from "../images/logo1.jpg";
import { useNavigate } from "react-router-dom";


export default function Header() {
  const navigate = useNavigate();

  const [verificationResult, setVerificationResult] = useState(false);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch("http://localhost:8000/verify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        if (!response.ok) {
          console.log("Error while verifying Token");
          return;
        }

        setVerificationResult(true);
      } catch (error) {
        console.log("Token verification failed:", error);
        setVerificationResult({ error: error.message });
      }
    };

    verifyToken();
  }, []);
  const refer=()=>{
    navigate("/")
  }
  return (
    <>
      <div className="h-16  border-b border-highlight flex justify-around items-center font-medium overflow-hidden bg-white">
        <div className="w-1/3 h-full flex justify-center items-center">
          <img src={logo1} alt="Logo" className="h-12 rounded-lg" />
          <p className=" mx-4 text-2xl font-black font-serif" onClick={refer}>Order Now<span className="text-highlight text-3xl">.</span> </p>
        </div>
        <button>
          <a href="/search">🔍 Search </a>
        </button>
        <button>
          <a href="/help"> 🙏🏼 Help</a>
        </button>
        <button>
          <a href={verificationResult ? "/Profile" : "/login"}>
            {verificationResult ? "Profile👤" : "Login🔐"}
          </a>
        </button>
        <button>
          <a href="/myCart">🛒 Cart </a>
        </button>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import logo1 from "../images/logo1.jpg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const [verificationResult, setVerificationResult] = useState(false);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const response = await fetch(`http://localhost:8000/verify`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include"
        });
        
        const data = await response.json();
        if (!data.success) {
          return;
        }
          setVerificationResult(true);
        if (data.role === "seller") {
          return navigate("/admin002");
        }
      } catch (error) {
        setMessage("User verification failed:", error);
        setVerificationResult({ error: error.success });
      }
    };

    verifyToken();
  }, []);
  return (
    <>
      <div className="h-16 border-b border-highlight flex justify-around items-center font-medium overflow-hidden text-sm">
        <div className="w-11/12 h-full flex justify-around items-center">
          <div className="w-5/12 h-11/ flex justify-center items-center">
            <img src={logo1} alt="Logo" className="h-8 rounded-lg" />
            <p
              className=" md:mx-4 font-black font-serif text-nowrap flex justify-center items-end md:text-2xl"
              onClick={() => {
                navigate("/");
              }}
            >
              Order Now
              <span className="text-highlight flex justify-center items-center text-3xl">
                .
              </span>
            </p>
          </div>
          <button>
            <a href="/search" className="text-nowrap text-xs font-bold md:text-base">
              🔍Search{" "}
            </a>
          </button>
          <button>
            <a href="/help" className="text-nowrap text-xs font-bold md:text-base">
              {" "}
              🙏🏼Help
            </a>
          </button>
          <button>
            <a
              href={verificationResult ? "/Profile" : "/login"}
              className="text-nowrap text-xs font-bold md:text-base"
            >
              {verificationResult ? "👤Profile" : "🔐Login"}
            </a>
          </button>
          <button>
            <a href="/myCart" className="text-nowrap text-xs font-bold md:text-base">
              🛒Cart{" "}
            </a>
          </button>
        </div>
      </div>
      <h1 className="text-center text-red-500">{message}</h1>
    </>
  );
}

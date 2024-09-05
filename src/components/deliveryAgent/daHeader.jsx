import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import logo1 from "../../images/logo1.jpg";

export default function DAHeader() {
    const [verificationResult, setVerificationResult] = useState(false);
    const [message, setMessage] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch(`http://localhost:8000/verify`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });
                if (!response.ok) {
                    setMessage("Error while verifying user, Login to continue");
                    return;
                }
                setVerificationResult(true);
            } catch (error) {
                setVerificationResult(false);
            }
        };

        verifyToken();
    }, []);
    const refer=()=>{
        navigate("/deliveryagent002")
    }
    return (
        <>
            <h1>{message}</h1>
            <div className="h-16  border-b border-highlight flex justify-around items-center font-medium overflow-hidden bg-white">
                <div className="w-1/3 h-full flex justify-center items-center">
                    <img src={logo1} alt="Logo" className="h-12 rounded-lg" />
                    <p className=" mx-4 text-2xl font-black font-serif" onClick={refer}>Order Now<span className="text-highlight text-3xl">.</span> </p>
                </div>

                <button>
                    <a href={verificationResult ? "/deliveryagent002/Profile" : "/login"}>
                        {verificationResult ? "Profile👤" : "Login🔐"}
                    </a>
                </button>
                <button>
                    <a href="/deliveryagent002/deliveredOrders">Delivered Orders🛒</a>
                </button>
                <button>
                    <a href="/deliveryagent002/verifycustomer">Verify customer✅</a>
                </button>
            </div>
        </>
    )
}
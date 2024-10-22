import React, { useState, useEffect } from 'react'
import { FaDollarSign, FaMapMarkerAlt, FaPhoneAlt, FaUser } from 'react-icons/fa';
import DAHeader from "./daHeader"
import { useNavigate } from "react-router-dom";
export default function VerifyCustomer() {
    const [message, setMessage] = useState("")
    const [pickedUpItems, setPickedUpItems] = useState([])
    const navigate = useNavigate()
    const [otp, setOpt] = useState("")
    const [userOtp, setUserOtp] = useState("")
    const [send, setSend] = useState(false)
    const [isOtpVerified, setOtpVerifien] = useState(false)
    useEffect(() => {
        const getAgentPickups = async () => {
            try {
                const response = await fetch(`https://foodorderbackend-8yh4.onrender.com/agent/pickupitems`, {
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
                const data = await response.json()
                console.log(data.Items)
                setPickedUpItems(data.Items)
            } catch (error) {
                setMessage(error.message);
            }
        }
        getAgentPickups()
    }, [])
    const sendEmail = async (clientEmail) => {
        try {
            const res = await fetch(`https://foodorderbackend-8yh4.onrender.com/sendEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ userEmail: clientEmail })
            })
            const response = await res.json()
            if (response.success) {
                setSend(true)
                setOpt(response.Otp)
            }
            else {
                setSend(false)
            }
        } catch (error) {
            setMessage(error.message)
        }
    }
    const verifyOtp = () => {
        if (otp == userOtp) {
            setOtpVerifien(true)
        }
        else {
            setMessage("Wrong Otp")
            setUserOtp("")
        }
    }
    const deliverOrder = async (orderId) => {
        try {
            const res = await fetch(`https://foodorderbackend-8yh4.onrender.com/agent/deliverOrder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ orderId })
            })
            const response = await res.json()
            if (response.success) {
                setMessage("Delivered")
            }
            else {
                setMessage("Try again after some time")
            }
        } catch (error) {
            setMessage(error.message)
        }
    }
    return (
        <>
            <div>
                <DAHeader />
                <div className='my-8'>
                    <h1>{message}</h1>
                    {pickedUpItems.map((item, index) => (
                        <div
                            key={item._id || index}
                            className="border rounded-lg p-4 shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-blue-50 flex justify-around items-center"
                        >
                            <div className="w-1/2 h-full">
                                <div className="flex items-center space-x-3 mb-3">
                                    <FaUser className="text-teal-500 text-2xl" />
                                    <h2 className="text-xl font-bold text-gray-800">Client Name-: {item.clientName}</h2>
                                </div>
                                <p className="text-gray-700 flex items-center space-x-2">
                                    <FaPhoneAlt className="text-orange-500" />
                                    <span className="text-gray-600">Client Phone No: {item.clientPhoneNo}</span>
                                </p>
                                <p className="text-gray-700 flex items-center space-x-2">
                                    <FaDollarSign className="text-green-500" />
                                    <span className="text-gray-600">Total Price: {item.TotalPrice}₹</span>
                                </p>
                                <p className="text-gray-700 flex items-center space-x-2">
                                    <FaMapMarkerAlt className="text-purple-500" />
                                    <span className="text-gray-600">{item.Country}, {item.State}, PIN: {item.Pin}</span>
                                </p>
                                <p className="text-gray-700">{item.Location}</p>
                            </div>
                            <div className= " p-4 rounded-lg flex justify-around items-center flex-col">
                                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    onClick={(e) => { sendEmail(item.clientEmail) }}
                                >
                                    {send ? "Email Send" : "Send Email"}
                                </button>
                                {send && (
                                    <>
                                        <label htmlFor="otp" className="sr-only">Enter OTP</label>
                                        <input
                                            type="text"
                                            id="otp"
                                            name="otp"
                                            value={userOtp}
                                            onChange={(e) => setUserOtp(e.target.value)}
                                            className="border rounded px-2 py-1"
                                            placeholder="Enter OTP"
                                        />
                                        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            onClick={() => {
                                                isOtpVerified ? deliverOrder(item._id) : verifyOtp();
                                            }}
                                        >
                                            {isOtpVerified ? "Deliver Order" : "verify Otp"}</button>
                                    </>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

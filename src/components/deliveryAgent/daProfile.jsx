import React, { useState, useEffect } from 'react'
import DAHeader from "./daHeader"
import Footer from "../Footer"
import LoadingScreen from "../LoadingScreen"
import { useNavigate } from "react-router-dom";

export default function DAProfile() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [order, setOrder] = useState([])
    const [profileData, setProfileData] = useState({
        DeliveryAgentEmail: "",
        DeliveryAgentName: "",
        DeliveryAgentPhoneNo: "",
        DeliveryCharge: "",
        OrderDelivered: [],
        TotalEarnings: ""
    })
    const navigate = useNavigate()

    useEffect(() => {
        const getProfileDetails = async () => {
            await fetch(`https://foodorderbackend-8yh4.onrender.com/agent/getProfileDetails`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }).then(async (res) => {
                const data = await res.json()
                console.log(data.result)
                setProfileData(data.result)
            })
        }
        getProfileDetails()
    }, [])
    const handelLogOut = async () => {
        try {
        await fetch(`https://foodorderbackend-8yh4.onrender.com/user/logout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        }).then(async (res) => {
          const logoutRes = await res.json()
          if (!logoutRes.success) {
            setMessage(logoutRes.message)
          }
          else {
            navigate("/");
          }
        })
      }
      catch (error) {
            setMessage(error.message)
      }
    } 
      const deleteAccount=async()=>{
        try {
            await fetch(`https://foodorderbackend-8yh4.onrender.com/agent/deleteAccount`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include"
            }).then(async (res) => {
              const logoutRes = await res.json()
              if (!logoutRes.success) {
                setMessage(logoutRes.message)
              }
              else {
                navigate("/");
              }
            })
          }
          catch (error) {
                setMessage(error.message)
          }
      }
      const editProfile=async()=>{
        alert("This will be sooner available")
      }
    return (
        <>
            <DAHeader />
            {loading && (
                <>
                    <LoadingScreen />
                </>
            )}
            {!loading && (
                <div className="min-h-50vh flex justify-center items-center">
                    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 animate-fadeIn space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{profileData.DeliveryAgentName}</h1>
                            <p className="text-gray-500">{profileData.DeliveryAgentEmail}</p>
                        </div>
                        <div className="border-t border-gray-300" />
                        <div className="space-y-4 text-center">
                            <div>
                                <span className="block text-sm font-medium text-gray-600">Phone Number</span>
                                <p className="text-lg font-semibold text-gray-800">{profileData.DeliveryAgentPhoneNo}</p>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-600">Delivery Charge</span>
                                <p className="text-lg font-semibold text-green-600">${profileData.DeliveryCharge}</p>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-600">Total Earnings</span>
                                <p className="text-lg font-semibold text-blue-600">${profileData.DeliveryCharge * (profileData.OrderDelivered.length)}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button className="w-full py-2 px-4 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 transition-all duration-300"
                            onClick={editProfile}>
                                Edit Profile
                            </button>
                            <button className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                            onClick={deleteAccount}>
                                Delete Account
                            </button>
                            <button className="w-full py-2 px-4 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-all duration-300"
                            onClick={handelLogOut}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}



            <Footer />
        </>
    )
}

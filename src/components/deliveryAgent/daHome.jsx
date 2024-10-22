import React, { useState, useEffect } from "react"
import DAHeader from "./daHeader"
import { FaDollarSign, FaMapMarkerAlt, FaPhoneAlt, FaUser } from 'react-icons/fa';
export default function DAHOME() {
    const [message, setMessage] = useState("")
    const [order, setOrders] = useState([])
    useEffect(() => {
        const getOrders = async () => {
            try {
                await fetch(`https://foodorderbackend-8yh4.onrender.com/agent/getallorders`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                }).then(async (res) => {
                    const data = await res.json()
                    console.log(data)
                    if (!data.success) {
                        setMessage(data.message)
                    }
                    else {
                        setOrders(data.result)
                    }
                })
            } catch (error) {
                setMessage(error.message)
            }
        }
        getOrders()
    }, [])
    const pickupOrder = async (id) => {
        try {
            await fetch(`https://foodorderbackend-8yh4.onrender.com/agent/pickUpItem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body:JSON.stringify({id})
            }).then(async (res) => {
                const data = await res.json()
                console.log(data)
                if(!data.success){
                    setMessage(data.message)
                    return
                }
                else{
                    navigator("/deliveryagent002")
                }

            })
        } catch (error) {
            setMessage(error.message)
        }
    }
    return (
        <>
            <DAHeader />
            <div className="p-6 space-y-6">
                {order.map((item) => (
                    <div
                        key={item._id}
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
                        <div className=" p-4 rounded-lg flex justify-center items-center">
                            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onClick={() => pickupOrder(item._id)}>
                                Pick Up
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </>
    )
}
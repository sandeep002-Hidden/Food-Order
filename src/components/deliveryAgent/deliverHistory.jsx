import React, { useState,useEffect } from 'react'
import Header from "./daHeader"
import Footer from "../Footer"
import LoadingScreen from "../LoadingScreen"
import { FaDollarSign, FaMapMarkerAlt, FaPhoneAlt, FaUser } from 'react-icons/fa';

export default function DeliverHistory() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [order,setOrder]=useState([])
    useEffect(()=>{
        try {
            const getDeliveredItems=async()=>{
                await fetch(`http://localhost:8000/agent/getDeliveredItems`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                }).then(async(res)=>{
                    const data=await res.json()
                    console.log(data.result)
                    setOrder(data.result)
                })
            }
            getDeliveredItems()
        } catch (error) {
            setMessage(error.message)
        }finally{
            setLoading(false)
        }
    },[])
    return (
        <>
            <Header />
            {loading && (
                <>
                    <LoadingScreen />
                </>
            )}
            {!loading && (
                <div className='min-h-50vh flex justify-center items-center flex-col'>
                    {order.map((item) => (
                    <div
                        key={item._id}
                        className="w-1/2 border rounded-lg p-4 shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-blue-50 flex justify-around items-center"
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

                    </div>
                ))}
                </div>
            )}
            <Footer />
        </>
    )
}

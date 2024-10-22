import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header"
import Footer from "../components/Footer"
import LoadingScreen from "../components/LoadingScreen"
export default function PendingOrders() {
    const { id } = useParams();
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [orderDetails, setOrderDetails] = useState({
        OrderStatus: "",
        DeliverAgentName: "",
        DeliverAgentPhoneNo: "",
        TotalPrice: ""
    }, [])
    useEffect(() => {
        const getOrderItems = async (id) => {
            try {
                setLoading(true)
                const response = await fetch(
                    "https://foodorderbackend-8yh4.onrender.com/user/getOrderItems",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({ id })
                    }
                );
                const data = await response.json()
                setOrderDetails(data.arr[0][0])
                setItems(data.arr[1])
            }

            catch (error) {
                setMessage(
                    "Error occur while updating Profile Details. Please try again!"
                );
            }
            finally {
                setLoading(false)
            }
        }
        getOrderItems(id)
    }, [id])
    return (
        <>
            <Header />
            <h1>{message}</h1>
            <div className='min-h-50vh flex justify-start items-center flex-col'>
                {loading && (
                    <LoadingScreen />
                )
                }
                {!loading && (
                    <>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="h-36 w-10/12  border border-purple-500 rounded-xl flex justify-around items-start m-4 overflow-hidden"
                            >
                                <div>
                                    <img
                                        src={item.itemDetails.ImageLink}
                                        alt={item.ItemName}
                                        className="w-32 h-24 md:h-32 rounded-lg md:w-44 mx-2"
                                    />
                                </div>
                                <div className="h-28 flex justify-around items-start flex-col w-20 md:w-64 mx-1 p-1">
                                    <p className="text-highlight font-bold text-sm md:text-xl">
                                        {item.itemDetails.ItemName} <span className='text-black text-base'>X {item.qauntity}</span>
                                    </p>
                                    <p className="md:text-xl font-bold text-xs">
                                        {item.itemDetails.ItemPrice} ₹
                                    </p>
                                    <p className="text-yellow-600 text-xs md:text-lg font-semibold">
                                        ⭐4.5/5
                                    </p>
                                    <p className="text-sm h-5 overflow-clip">
                                        {item.itemDetails.ItemDescription}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className='w-10/12 flex justify-around items-start '>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className="bg-highlight text-white p-2 rounded-full mr-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-2 w-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 8c-1.1 0-2 .9-2 2v1.12c-.94.34-1.83.94-2.48 1.72-.64.77-1.02 1.74-1.02 2.76 0 1.65 1.35 3 3 3h1.26c.65 0 1.28-.18 1.82-.51.53-.33.96-.8 1.27-1.36H14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2zM10 16.5c-.83 0-1.5-.67-1.5-1.5S9.17 13.5 10 13.5s1.5.67 1.5 1.5S10.83 16.5 10 16.5zm3-10c0-.83-.67-1.5-1.5-1.5S10 5.67 10 6.5 10.67 8 11.5 8 13 7.33 13 6.5zM21 12h-2v2h-2v2h-2v2h-2v2h-2v-2h-2v-2H7v-2H5v-2H3v-2H1V8h2V6h2V4h2V2h2V0h2v2h2v2h2v2h2v2h2v2h2v2z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-semibold text-gray-800">
                                        Order Status: {orderDetails.OrderStatus}
                                    </span>
                                </div>

                               <span className="relative flex justify-center items-center h-4 w-4 ml-1">
  <span className="absolute inset-0 flex items-center justify-center">
    <span className="animate-ping absolute h-4 w-4 rounded-full bg-highlight opacity-75"></span>
  </span>
  <span className="relative inline-flex rounded-full h-2 w-2 bg-highlight"></span>
</span>



                            </div>

                            <div className="flex items-start mb-6">
                                <div className="bg-highlight text-white p-3 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-2 w-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.232 5.232l1.536 1.536a1.5 1.5 0 011.416 0l5.086 5.086a1.5 1.5 0 010 2.122l-9.192 9.192a1.5 1.5 0 01-2.122 0l-9.192-9.192a1.5 1.5 0 010-2.122l5.086-5.086a1.5 1.5 0 011.416 0l1.536 1.536M15 7h.01M5 21h.01M19 5l.01-.011M5 5l.01-.011M19 19l.01-.011M7 9h.01M17 9h.01M7 19h.01"
                                        />
                                    </svg>
                                </div>
                                <h1 className="text-lg font-bold text-black ml-4">Delivery Agent

                                    <div className=' '>
                                        <div className="flex text-sm mx-4 font-semibold items-center mb-2">
                                            <h1 className=" w-fit inline-block">Name:</h1>
                                            <span className="ml-2">{orderDetails.DeliverAgentName || "Give after pickup"}</span>
                                        </div>
                                        <div className="flex text-sm mx-4 font-semibold items-center mb-2">
                                            <h1 className=" w-fit inline-block">Phone:</h1>
                                            <span className="ml-2">{orderDetails.DeliverAgentPhoneNo || "Give after pickup"}</span>
                                        </div>
                                    </div>
                                </h1>
                            </div>
                            <div className="flex items-center mb-6">
                                <div className="bg-highlight text-white p-2 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 8c-1.1 0-2 .9-2 2v1.12c-.94.34-1.83.94-2.48 1.72-.64.77-1.02 1.74-1.02 2.76 0 1.65 1.35 3 3 3h1.26c.65 0 1.28-.18 1.82-.51.53-.33.96-.8 1.27-1.36H14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2zM10 16.5c-.83 0-1.5-.67-1.5-1.5S9.17 13.5 10 13.5s1.5.67 1.5 1.5S10.83 16.5 10 16.5zm3-10c0-.83-.67-1.5-1.5-1.5S10 5.67 10 6.5 10.67 8 11.5 8 13 7.33 13 6.5zM21 12h-2v2h-2v2h-2v2h-2v2h-2v-2h-2v-2H7v-2H5v-2H3v-2H1V8h2V6h2V4h2V2h2V0h2v2h2v2h2v2h2v2h2v2h2v2z"
                                        />
                                    </svg>
                                </div>
                                <h1 className="ml-4 text-lg font-bold text-black">
                                    Total Price: <span className='text-sm mx-4 font-semibold'>{orderDetails.TotalPrice} ₹</span>
                                </h1>
                            </div>
                        </div>
                    </>
                )}

            </div >
            <Footer />
        </>
    );
};
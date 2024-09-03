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
    useEffect(() => {
        const getOrderItems = async (id) => {
            try {
                const response = await fetch(
                    "http://localhost:8000/user/getOrderItems",
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
                setItems(data.arr)
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
                                        src={item.ImageLink}
                                        alt={item.ItemName}
                                        className="w-32 h-24 md:h-32 rounded-lg md:w-44 mx-2"
                                    />
                                </div>
                                <div className="h-28 flex justify-around items-start flex-col w-20 md:w-64 mx-1 p-1">
                                    <p className="text-highlight font-bold text-sm md:text-xl">
                                        {item.ItemName}
                                    </p>
                                    <p className="md:text-xl font-bold text-xs">
                                        {item.ItemPrice} ₹
                                    </p>
                                    <p className="text-yellow-600 text-xs md:text-lg font-semibold">
                                        ⭐4.5/5
                                    </p>
                                    <p className="text-sm h-5 overflow-clip">
                                        {item.ItemDescription}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </>
                )}



            </div>
            <Footer />
        </>
    );
};
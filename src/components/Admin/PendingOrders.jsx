import React, { useEffect, useState } from "react"
import AdminHeader from "./AHeader"
import LoadingScreen from "../LoadingScreen"
import Footer from "../Footer"
export default function APendingOrders() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [items, setItems] = useState([])
    useEffect(() => {
        try {
            setLoading(true)
            const apendingOrders = async () => {
                await fetch(`https://foodorderbackend-8yh4.onrender.com/admin/apendingOrders`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }).then(async (res) => {
                    const data = await res.json()
                    if (!data.success) {
                        setMessage(data.message)
                        return
                    }
                    setItems(data.Items)
                })
            }
            apendingOrders()
        } catch (error) {
            setMessage(error.message)
        }
        finally {
            setLoading(false)
        }
    }, [])
    return (
        <>
            <AdminHeader />
            <div className="min-h-50vh flex flex-col items-center justify-center p-4">
                {loading ? (
                    <div className="flex items-center justify-center">
                        <LoadingScreen />
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-semibold mb-6 animate-fadeIn">
                            {message}
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-lg">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fadeIn"
                                >
                                    <img
                                        src={item.product.ImageLink}
                                        alt={item.product.ItemName}
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />
                                    <h2 className="text-2xl font-bold mb-2">
                                        {item.product.ItemName}
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-2">
                                        {item.product.ItemDescription}
                                    </p>
                                    <p className="text-xl font-semibold text-highlight mb-4">
                                        {item.product.ItemPrice}₹
                                    </p>
                                    <p className="text-lg font-medium">
                                        Quantity: {item.amount}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    )
}
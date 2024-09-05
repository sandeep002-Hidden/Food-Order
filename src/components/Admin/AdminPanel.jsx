import React, { useState, useEffect } from "react"
import AdminHeader from "./AHeader.jsx"
import Footer from "../Footer.jsx"
export default function AdminPanel() {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    useEffect(() => {
        const getSellerItems = async () => {
            try {
                setLoading(true)
                const response = await fetch("http://localhost:8000/admin/getSellerItems", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error("Error while verifying token");
                }
                const data = await response.json();
                console.log(data.Items)
                if (data.success) {
                    setItems(data.Items)
                }
                else if (data.Items.length = 0) {
                    setMessage("Add Your Items for Sell")
                }
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        }
        getSellerItems()
    }, [])
    return (
        <>
            <AdminHeader />
            <div className="min-h-50vh p-4">
  {loading && (
    <div className="animate-pulse text-center text-lg">Loading...</div>
  )}
  {!loading && (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-screen-lg mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          <img
            src={item.ImageLink}
            alt={item.ItemName}
            className="w-10/12 h-40 object-cover rounded-t-lg"
          />
          <div className="mt-4">
            <h1 className="text-xl font-semibold">Item Name -: {item.ItemName}</h1>
            <p className="text-gray-600">About -: {item.ItemDescription}</p>
            <p className="text-indigo-500 font-bold mt-2">Item Price -: {item.ItemPrice}₹</p>
            <p className="text-gray-600">Total Orders -: {item.NumberOfOrder}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.TypeOfDish.map((td, tdIndex) => (
                <span
                  key={tdIndex}
                  className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
                >
                  {td}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

            <Footer />
        </>
    )
}
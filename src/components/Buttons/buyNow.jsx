import React, { useState } from "react";

export default function BuyNowBtn(item) {
  const [message, setMessage] = useState("")
  const buyNow = async (item) => {
    const temp = { _id: item.id._id, ItemPrice: item.id.ItemPrice, SellerId: item.id.SellerId, ItemName: item.id.ItemName }
    const myCart = [temp]
    try {
      await fetch(
        `https://foodorderbackend-8yh4.onrender.com/user/buyCartItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ myCart, quantity: [1] })
        }
      ).then(async (res) => {
        const data = await res.json()
        if (!data.success) {
          setMessage(data.message)
        }
      })
    } catch (error) {
      setMessage(error.message)
    }
  };
  return (
    <>
      <button
  className="w-fit h-10 rounded-md px-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-bold border transform transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300"
  onClick={() => buyNow(item)}
>
  Buy Now
</button>

    </>
  );
}

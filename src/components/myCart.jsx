import React, { useState, useEffect } from "react";

import Header from "./Header.jsx";
export default function MyCart() {
  const [myCart, setMyCart] = useState([{}]);
  const [message, setMessage] = useState("");
  const [goodMessage, setGoodMessage] = useState("");
  const [quantity, setQuantity] = useState(Array(20).fill(1));

  const decreaseAmount = (index) => {
    setQuantity((prevQuantity) => {
      const newQuantity = [...prevQuantity];
      newQuantity[index] = Math.max(0, newQuantity[index] - 1);
      return newQuantity;
    });
  };

  const increaseAmount = (index) => {
    setQuantity((prevQuantity) => {
      const newQuantity = [...prevQuantity];
      newQuantity[index] += 1;
      return newQuantity;
    });
  };

  useEffect(() => {
    const getCartItems = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Login to continue");
      }
      const items = await fetch("http://localhost:8000/user/getCartItems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-item-token002": token,
        },
      });
      const data = await items.json();
      setMyCart(data);

      return;
    };
    getCartItems();
  }, []);
  const removeItem = async (index) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Login to continue");
    }
    const removeItem = myCart[index];
    const body = { token, removeItem };
    const removeRes = await fetch(
      "http://localhost:8000/user/removeItemFromCart",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!removeRes.ok) {
      setMessage("Error Occur While removing Item From Your cart");
    } else {
      setMessage("Item Removed From Your Cart");
      setTimeout(() => {
        setMessage("")
        setGoodMessage("Reload to see Removed 😗")
      }, 2000);
    }
  };
  return (
    <>
      <Header />
      <h1 className="text-center text-red-500 font-bold">{message}</h1>
      <h1 className="text-center text-green-500 font-bold">{goodMessage}</h1>

      <div className="h-fit overflow-y-hidden flex justify-center items-center flex-col">
        {myCart.map((item, index) => (
          <div
            key={item._id}
            className=" h-36 w-10/12 border border-purple-500 rounded-xl flex justify-around items-center m-4"
          >
            <img src={item.ImageLink} alt={item.ItemName} className=" w-48" />
            <div className="w-1/2">
              <p className="font-bold">{item.ItemName}</p>
              <p>Item Price</p>
              <p>{item.ItemDescription}</p>
            </div>
            <div className="h-full w-1/6 flex justify-around items-center flex-col">
              <div className="border p-2 border-cyan-400 rounded-lg ">
                <button
                  onClick={() => {
                    decreaseAmount(index);
                  }}
                  className="bg-blue-400 h-6 w-6 rounded-md mx-2"
                >
                  -
                </button>
                {quantity[index]}
                <button
                  onClick={() => {
                    increaseAmount(index);
                  }}
                  className="bg-blue-400 h-6 w-6 rounded-md mx-2"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  removeItem(index);
                }}
                className="border border-black rounded-lg p-1"
              >
                Remove Item
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>Check Out Now</div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollableItem from "./ScrollableItem";

export default function Home() {
  const [items, setItems] = useState([]);
  
  
  
  const getItems = async () => {
    const items = await fetch("http://localhost:8000/user/getItems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await items.json();
    const itemObj = data.Item;
    return itemObj;
  };
  useEffect(() => {
    const fetchItems = async () => {
      const itemsList = await getItems();
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  const addToCart = async (id) => {
    alert("Adding Items to Your Cart")
    if (localStorage.getItem("token")) {
      const token=localStorage.getItem("token")
      const idObj={id:id,token:token}
      try {
        const addToCartRes = await fetch(
          "http://localhost:8000/user/addToCart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(idObj)
          }
        );
        const jsonAddToCartRes = await addToCartRes.json();
        console.log(jsonAddToCartRes);
      } catch (error) {
        console.log("Error occur while adding items to the cart");
      }
    } else {
      alert("Login to Add items to Your cart");
    }
  };
  const buyNow = async (id) => {
    console.log("Buy Now ", id);
    if (localStorage.getItem("token")) {
    } else {
      alert("Login to Purchase to Your cart");
    }
  };

  return (
    <>
      <Header />
      <ScrollableItem/>
      <div className=" h-fit  flex justify-center items-center  no-scrollbar">
        <div className="w-3/4 h-fit grid grid-cols-4 gap-4 ">
          {items.map((i) => (
            <div className="h-fit w-42 border border-purple-500 rounded-xl">
              <img
                key={i._id}
                src={i.ImageLink}
                alt={i.ItemName}
                className="rounded-t-xl h-32"
              />
              <div className="py-1 px-2">
                <h1 className="font-bold text-highlight">{i.ItemName}</h1>
                <h1 className="font-bold">{i.ItemPrice} ₹</h1>
                <h1 className="font-bold">⭐4.5/5.0</h1>
                <h1 className="font-medium h-6 overflow-hidden">
                  {i.ItemDescription}
                </h1>
                <div className="h-fit w-full flex justify-around items-center">
                  <button
                    className="w-fit h-10 rounded-md px-2 bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-500 text-white font-bold border"
                    onClick={() => addToCart(i._id)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="w-fit h-10 rounded-md px-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-bold border"
                    onClick={() => buyNow(i._id)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

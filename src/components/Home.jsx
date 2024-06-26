import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollableItem from "./ScrollableItem";
import AddToCart from "./Buttons/addToCartButton";
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
    setItems(itemObj);
    return
  };
  useEffect(() => {
    const fetchItems = async () => {
      try {
        getItems();
      } catch (error) {
        alert("Try again after some time")
      }
      
    };

    fetchItems();
  }, []);

  const buyNow = async (id) => {
    if (localStorage.getItem("token")) {
    } else {
      alert("Login to Purchase to Your cart");
    }
  };

  return (
    <>
      <Header />
      <ScrollableItem />
      <div className=" h-fit  flex justify-center items-center  no-scrollbar">
        <div className="w-3/4 h-fit grid grid-cols-4 gap-4 ">
          {items.map((i) => (
            <div
              key={i._id}
              className="h-fit w-42 border border-purple-500 rounded-xl"
            >
              <img
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
                  <AddToCart id={i._id} />
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

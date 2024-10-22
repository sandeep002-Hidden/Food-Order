import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollableItem from "./ScrollableItem";
import AddToCart from "./Buttons/addToCartButton";
import BuyNowBtn from "./Buttons/buyNow";

export default function Home() {
  const [items, setItems] = useState([]);
  const getItems = async () => {
    try {
      const items = await fetch(`https://foodorderbackend-8yh4.onrender.com/user/getItems`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await items.json();
      const itemObj = data.Item;
      setItems(itemObj);
      return
    } catch (error) {
      console.log(error.message)
    }
    
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
  return (
    <>
      <Header />
      <ScrollableItem />
      <div className="flex justify-center items-center   no-scrollbar min-h-screen">
        <div className="md:w-3/4 h-fit grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="h-fit w-64 md:w-52 border border-purple-500 rounded-xl hover:shadow-lg hover:shadow-highlight transition-shadow duration-200"
              >
              <img
                src={item.ImageLink}
                alt={item.ItemName}
                className="rounded-t-xl h-32 w-full"
              />
              <div className="py-1 px-2">
                <h1 className="font-bold text-highlight">{item.ItemName}</h1>
                <h1 className="font-bold">{item.ItemPrice} ₹</h1>
                <h1 className="font-bold">⭐4.5/5.0</h1>
                <h1 className="font-medium h-6 overflow-hidden">
                  {item.ItemDescription}
                </h1>
                <div className="h-fit w-full flex justify-around items-center">
                  <AddToCart id={item._id} />
                  <BuyNowBtn id={item} />
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

import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import biriyani from "../images/biriyani.png";
import burger from "../images/burger.avif";
import role from "../images/role.avif";
import noodels from "../images/noodels.avif";
import pizza from "../images/pizza.jpg";
import cake from "../images/cake.jpg";
import chicken from "../images/chicken.jpg";
import chole from "../images/chole.jpg";
import momo from "../images/momo.png";
import mutton from "../images/mutton.png";
import paneer from "../images/paneer.png";

export default function Home() {
  const [items, setItems] = useState([]);

  const scrollableDivRef = useRef(null);

  const scrollLeft = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  const mainItems = [
    { itemImage: biriyani, ItemName: "Biriyani" },
    { itemImage: role, ItemName: "Role" },
    { itemImage: burger, ItemName: "Burger" },
    { itemImage: pizza, ItemName: "Pizza" },
    { itemImage: noodels, ItemName: "Chinese" },
    { itemImage: cake, ItemName: "Cake" },
    { itemImage: chicken, ItemName: "Chicken" },
    { itemImage: chole, ItemName: "Chole" },
    { itemImage: momo, ItemName: "momo" },
    { itemImage: mutton, ItemName: "Mutton" },
    { itemImage: paneer, ItemName: "paneer" },
  ];
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
      <div className="h-64 my-8 flex justify-around items-center  flex-col">
        <div className="h-4 w-3/4 flex justify-between items-center">
          <p className="w-3/4 font-bold text-xl text-left mx-6">
            Have a Look 😋 <span className="text-highlight">?</span>
          </p>
          <div className="flex justify-center items-center w-1/4">
            <div>
              <button onClick={scrollLeft}>⬅️</button>
            </div>
            <div>
              <button onClick={scrollRight}>➡️</button>
            </div>
          </div>
        </div>
        <div
          ref={scrollableDivRef}
          className="h-52 w-3/4 flex justify-between items-center overflow-x-scroll no-scrollbar"
        >
          <div className="w-fit flex justify-center items-center">
            {mainItems.map((item) => (
              <div className="h-48 w-48 border border-black mx-6 flex justify-center items-center rounded-lg flex-col">
                <img
                  src={item.itemImage}
                  alt={item.ItemName}
                  className="h-32"
                />
                <h1>{item.ItemName}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" h-fit  flex justify-center items-center  no-scrollbar">
        <div className="w-3/4 h-fit grid grid-cols-4 gap-4 ">
          {items.map((i) => (
            <div className="h-fit w-42 border border-purple-500 rounded-xl">
              <img
                key={i._id}
                src={i.ImageLink}
                alt={i.ItemName}
                className="rounded-t-xl"
              />
              <div className="py-1 px-2">
                <h1 className="font-bold text-highlight">{i.ItemName}</h1>
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

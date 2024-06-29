import React, { useState, useRef } from "react";
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
import AddToCart from "./addToCartButton";



export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [itemResult, setItemResult] = useState([]);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
  };
  const scrollableDivRef = useRef(null);
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
  const handleSearch = async (searchQuery) => {
    document.getElementById("searchResult").style.display = "block";
    const items = [
      "Biriyani",
      "Role",
      "Burger",
      "Pizza",
      "Chinese",
      "Cake",
      "Chicken",
      "Chole",
      "Momo",
      "Mutton",
      "Paneer",
    ];
    const filteredResults = items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filteredResults);
  };
  const searchItem = async (index) => {
    const item = mainItems[index].ItemName;
    findItem(item);
    setQuery(item);
  };
  const handelClick = (result) => {
    setQuery(result);
    document.getElementById("searchResult").style.display = "none";
  };
  const findItem = async (item) => {
    setQuery("");
    const Item = { Item: item };
    try {
      const resultIem = await fetch("http://localhost:8000/user/findItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Item),
      });
      const temp = await resultIem.json();
      setItemResult(temp);
    } catch (error) {
      console.log("Error occur while Finding items");
    }
  };
  return (
    <>
      <Header />
      <div className="h-fit my-8 flex justify-center items-start">
        <div className="h-full">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search..."
            className="border-2 w-96 outline-highlight border-highlight h-12 p-2 rounded-md"
          />
          <div id="searchResult" className="">
            {results.map((result, index) => (
              <div
                key={index}
                className="search-result-item w-96 h-8 border rounded-md border-blue-400 p-2"
                onClick={() => handelClick(result)}
              >
                {result}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center h-12">
          <button
            className="h-fit w-fit px-4 py-2 bg-highlight rounded-lg mx-4"
            onClick={() => findItem(query)}
          >
            Search
          </button>
        </div>
      </div>
      {/* scrollable div */}
      <div className="h-42 flex justify-around items-center  flex-col">
        <div
          ref={scrollableDivRef}
          className="h-52 bg-gray-100 w-3/4 flex justify-between items-center overflow-x-scroll no-scrollbar"
        >
          <div className="w-fit flex justify-center items-center">
            {mainItems.map((item, index) => (
              <div
                className="h-36 w-40 border border-black text-sm mx-6 flex justify-center items-center rounded-lg flex-col"
                onClick={() => {
                  searchItem(index);
                }}
              >
                <img
                  src={item.itemImage}
                  alt={item.ItemName}
                  className="h-28 rounded-lg"
                />
                <h1>{item.ItemName}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex justify-center items-center">
        <div className="w-3/4 h-full">
          {itemResult.map((item, index) => (
            <div className="flex justify-around items-center h-48  rounded-xl border border-highlight">
              <div>
                <img
                  src={item.ImageLink}
                  alt={item.ItemName}
                  className="h-32 rounded-lg"
                />
              </div>
              <div className="h-32 flex justify-around items-start flex-col">
                <p className="text-xl font-bold">{item.ItemPrice}</p>
                <p className=" text-yellow-600 text-lg font-semibold">⭐4.5/5</p>
                <p className="text-sm">{item.ItemDescription}</p>
              </div>
              <div className="h-32 flex justify-around items-center flex-col">
                <AddToCart id={item._id}/>
                {/* <button className="border-2 border-purple-500 rounded-lg p-2">
                  Add to cart
                </button> */}
                <button className="border-2 border-purple-500 rounded-lg p-2">
                  BuyNow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

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
import AddToCart from "./Buttons/addToCartButton";

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
    const Item = { Item: item.toLowerCase() };
    try {
      const resultIem = await fetch(`https://foodorderbackend-8yh4.onrender.com/user/findItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Item),
      });
      const temp = await resultIem.json();
      console.log(temp)
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
            className="border-2 w-44 sm:w-72 md:w-96 outline-highlight border-highlight h-12 p-2 rounded-md"
          />
          <div id="searchResult" className="">
            {results.map((result, index) => (
              <div
                key={index}
                className="search-result-item sm:w-72 md:w-96 h-8 border rounded-md border-blue-400 p-2"
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
      <div className="h-42 flex justify-around items-center  flex-col">
        <div
          ref={scrollableDivRef}
          className="h-52 md:bg-gray-100 w-3/4 flex justify-between items-center overflow-x-scroll no-scrollbar"
        >
          <div className="w-fit flex justify-center items-center">
            {mainItems.map((item, index) => (
              <div
                key={index}
                className="h-36 w-40 border border-black text-sm mx-6 flex justify-center items-center rounded-lg flex-col transition-transform transform hover:scale-105 hover:shadow-lg hover:border-purple-500"
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
      <div className="flex justify-center min-h-50vh items-start">
        <div className="w-11/12 md:w-3/4 h-full">
          {itemResult.map((item, index) => (
            <div
              key={item._id} className="flex m-2 justify-around items-center h-36  rounded-xl border border-highlight">
              <div className="flex justify-center items-center ">
                <div>
                  <img
                    src={item.ImageLink}
                    alt={item.ItemName}
                    className="w-64 h-24 md:h-32 rounded-lg md:w-44 mx-2"
                  />
                </div>
                <div className="h-32 flex justify-around items-start flex-col w-32 md:w-64 mx-2 p-2">
                  <p className="text-highlight font-bold text-base md:text-xl text-nowrap">
                    {item.ItemName}
                  </p>
                  <p className="md:text-xl font-bold text-sm">{item.ItemPrice}</p>
                  <p className=" text-yellow-600 text-xs md:text-lg font-semibold">
                    ⭐4.5/5
                  </p>
                  <p className="text-sm h-5 overflow-clip">{item.ItemDescription}</p>
                </div>
              </div>
              <div className="h-32 flex justify-around items-center flex-col">
                <AddToCart id={item._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

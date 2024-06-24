import React, { useState } from "react";
import Header from "./Header";
import ScrollableItem from "./ScrollableItem";
import Footer from "./Footer";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
  };

  const handleSearch = async(searchQuery) => {
    document.getElementById("searchResult").style.display = "block";
    const items = ["Biriyani", "Role", "Burger", "Pizza", "Chinese","Cake","Chicken","Chole","Momo","Mutton","Paneer"];
    const filteredResults = items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filteredResults);
  };
  const handelClick = (result) => {
    setQuery(result);
    document.getElementById("searchResult").style.display = "none";
  };
  const findItem = (item) => {
    console.log(item);
    setQuery("");
  };
  return (
    <>
      <Header />
      <div className="h-fit my-12 flex justify-center items-center">
        <div className="">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search..."
            className="border-2 w-96 outline-highlight border-highlight h-12 p-2 rounded-md"
          />
          <div id="searchResult">
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
        <button
          className="h-fit w-fit px-4 py-2 bg-highlight rounded-lg mx-4"
          onClick={() => findItem(query)}
        >
          Search
        </button>
      </div>
      <ScrollableItem />
      <div className=" h-96 flex justify-center items-center">
        <div className="w-3/4 h-full bg-slate-600"></div>
      </div>
      <Footer/>

    </>
  );
}

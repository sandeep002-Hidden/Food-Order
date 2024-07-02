import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

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

export default function ScrollableItem() {
  const navigate = useNavigate();

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
  const searchItem = async (index) => {
    const item = mainItems[index].ItemName;
    navigate(`/search`);
    
  };
  return (
    <>
      <div className=" h-48 md:h-64 my-8 flex justify-around items-center  flex-col">
        <div className="h-5  w-3/4 flex justify-between items-center">
          <p className="w-3/4 font-bold text-xl text-left mx-6 text-nowrap">
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
          className=" h-44 md:h-52 w-3/4 flex justify-between  items-center overflow-x-scroll no-scrollbar"
        >
          <div className="flex justify-between items-center">
            {mainItems.map((item, index) => (
              <div
                className=" h-40 w-36 md:h-48 md:w-48 border border-black mx-6 flex justify-between items-center rounded-lg flex-col"
                onClick={() => {
                  searchItem(index);
                }}
              >
                <img
                  src={item.itemImage}
                  alt={item.ItemName}
                  className=" h-32 md:h-40 w-full rounded-t-lg"
                />
                <h1 className="">{item.ItemName}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import AdminHeader from "./AHeader";

export default function AddItem() {
  const [ItemName, setItemName] = useState();
  const [ItemDescription, setItemDescription] = useState();
  const [ImageLink, setImageLink] = useState();
  const [ItemPrice, setItemPrice] = useState();
  const [TypeOfDish, setTypeOfDish] = useState();
  const [message, setMessage] = useState();
  const addItem = async () => {
    const TypeOfDish1=TypeOfDish.split(",")
    const TypeOfDish2=[]
    TypeOfDish1.map((item) => {
      TypeOfDish2.push(item.toLowerCase());
    });    
    const itemData = { ItemName:ItemName.toLowerCase(),ItemPrice, ItemDescription, ImageLink,TypeOfDish2 };
    setItemName("");
    setItemDescription("");
    setImageLink("");
    setItemPrice("")
    setTypeOfDish("")
    try {
      const res = await fetch(`http://localhost:8000/admin/addItems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(itemData),
      });
      setMessage("Added item success fully")
    } catch (e) {
      console.log(e);
      setMessage("Error Occur while adding items ");
    }
  };
  return (
    <>
      <AdminHeader />
      <div className="flex justify-center items-center">
        <div className="h-screen w-3/4  my-4">
          <h1 className="text-center">{message}</h1>
          <div>
            <span>Enter the Item Name</span>
            <input
              type="text"
              value={ItemName}
              name="ItemName"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              required
              className="outline-none border border-highlight"
            />
          </div>
          <div>
            <span>Enter the Item Price</span>
            <input
              type="text"
              value={ItemPrice}
              name="ItemPrice"
              onChange={(e) => {
                setItemPrice(e.target.value);
              }}
              required
              className="outline-none border border-highlight"
            />
          </div>
          
          <div>
            <span>Enter item Image Link</span>

            <input
              type="url"
              name="ImageLink"
              value={ImageLink}
              onChange={(e) => {
                setImageLink(e.target.value);
              }}
              className="outline-none border border-highlight"
              required
            />
          </div>
          <div>
            <span>Enter the type of dish separated by spaces</span>

            <input
              type="url"
              name="ImageLink"
              value={TypeOfDish}
              onChange={(e) => {
                setTypeOfDish(e.target.value);
              }}
              className="outline-none border border-highlight"
              required
            />
          </div>
          <div>
            <span>Describe about item</span>
            <input
              type="text"
              name="ItemDescription"
              value={ItemDescription}
              onChange={(e) => {
                setItemDescription(e.target.value);
              }}
              className="outline-none border border-highlight"
            />
          </div>
          <button className="my-4 mx-8 bg-purple-400" onClick={addItem}>
            Add Item
          </button>
        </div>
      </div>
    </>
  );
}

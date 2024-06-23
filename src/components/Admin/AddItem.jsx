import React, { useState } from "react";
import AdminHeader from "./AHeader";

export default function AddItem() {
  const [ItemName, setItemName] = useState();
  const [ItemDescription, setItemDescription] = useState();
  const [ImageLink, setImageLink] = useState();
  const [message, setMessage] = useState();
  const addItem = async () => {
    const itemData = { ItemName, ItemDescription, ImageLink };
    setItemName("");
    setItemDescription("");
    setImageLink("");
    try {
      const res = await fetch("http://localhost:8000/user/admin/addItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });
      const data=await res.json()
      console.log(data.message)
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

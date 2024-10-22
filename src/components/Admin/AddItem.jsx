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
      const res = await fetch(`https://foodorderbackend-8yh4.onrender.com/admin/addItems`, {
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
  <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
    <h1 className="text-2xl font-semibold text-center mb-6">{message}</h1>
    
    <form className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Enter the Item Name</label>
        <input
          type="text"
          value={ItemName}
          name="ItemName"
          onChange={(e) => setItemName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Enter the Item Price</label>
        <input
          type="text"
          value={ItemPrice}
          name="ItemPrice"
          onChange={(e) => setItemPrice(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Enter Item Image Link</label>
        <input
          type="url"
          name="ImageLink"
          value={ImageLink}
          onChange={(e) => setImageLink(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Enter the Type of Dish (separated by spaces)</label>
        <input
          type="text"
          name="TypeOfDish"
          value={TypeOfDish}
          onChange={(e) => setTypeOfDish(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Describe the Item</label>
        <input
          type="text"
          name="ItemDescription"
          value={ItemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="button"
        className="w-full py-2 px-4 bg-purple-500 text-white font-semibold rounded-md shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        onClick={addItem}
      >
        Add Item
      </button>
    </form>
  </div>
</div>

    </>
  );
}

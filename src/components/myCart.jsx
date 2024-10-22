import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen.jsx"
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function MyCart() {
  const [myCart, setMyCart] = useState([]);
  const [message, setMessage] = useState("");
  const [goodMessage, setGoodMessage] = useState("");
  const [quantity, setQuantity] = useState([]);
  const [loading, setLoading] = useState(false)
  const decreaseAmount = (index) => {
    setQuantity((prevQuantity) => {
      const newQuantity = [...prevQuantity];
      newQuantity[index] = Math.max(1, newQuantity[index] - 1);
      return newQuantity;
    });
  };
  const increaseAmount = (index) => {
    setQuantity((prevQuantity) => {
      const newQuantity = [...prevQuantity];
      newQuantity[index] += 1;
      return newQuantity;
    });
  };
  useEffect(() => {
    console.log(myCart)
  }, [myCart])
  const buyCartItems = async () => {
    try {
      await fetch(
        `https://foodorderbackend-8yh4.onrender.com/user/buyCartItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ myCart, quantity })
        }
      );
    } catch (error) {
      setMessage(error.message)
    }

  }
  useEffect(() => {
    const getCartItems = async () => {

      try {
        setLoading(true)
        const items = await fetch(`https://foodorderbackend-8yh4.onrender.com/user/getCartItems`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });
        const data = await items.json();
        if (!data.success) {
          setMessage(data.message)
          return
        }
        if (data.cartItems.length === 0) {
          setGoodMessage("Empty Cart");
          return
        }
        setMyCart(data.cartItems);
        setQuantity(Array(data.cartItems.length).fill(1));
      } catch (error) {
        console.log(error.message);
      }
      finally {
        setLoading(false)
      }
    };
    getCartItems();
  }, []);

  const removeItem = async (index) => {
    const removeItem = myCart[index];
    const removeRes = await fetch(
      `https://foodorderbackend-8yh4.onrender.com/user/removeItemFromCart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(removeItem),
      }
    );
    if (!removeRes.ok) {
      setMessage("Error Occur While removing Item From Your cart");
    } else {
      setMessage("Item Removed From Your Cart");
      setTimeout(() => {
        setMessage("");
        setGoodMessage("Reload to see Removed 😗");
      }, 2000);
      setMyCart((prevCart) => prevCart.filter((_, i) => i !== index));
      setQuantity((prevQuantity) => prevQuantity.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-between flex-col items-center">
        <h1 className="text-center text-red-500 text-2xl font-bold">
          {message}
        </h1>
        <h1 className="text-center text-green-500 text-2xl font-bold h-12 ">
          {goodMessage}
        </h1>

        <div className="w-full overflow-y-hidden flex justify-start items-center flex-col min-h-50vh">
          {loading && (
            <LoadingScreen />
          )

          }
          {!loading && (
            <>
              {myCart.map((item, index) => (
                <div
                  key={item._id}
                  className="h-36 w-10/12 border border-purple-500 rounded-xl flex justify-around items-center m-4 overflow-hidden"
                >
                  <div>
                    <img
                      src={item.ImageLink}
                      alt={item.ItemName}
                      className="w-32 h-24 md:h-32 rounded-lg md:w-44 mx-2"
                    />
                  </div>
                  <div className="h-28 flex justify-around items-start flex-col w-20 md:w-64 mx-1 p-1">
                    <p className="text-highlight font-bold text-sm md:text-xl">
                      {item.ItemName}
                    </p>
                    <p className="md:text-xl font-bold text-xs">
                      {item.ItemPrice} ₹
                    </p>
                    <p className="text-yellow-600 text-xs md:text-lg font-semibold">
                      ⭐4.5/5
                    </p>
                    <p className="text-sm h-5 overflow-clip">
                      {item.ItemDescription}
                    </p>
                  </div>
                  <div className="h-full w-24 flex justify-around items-center flex-col">
                    <div className="border p-1 md:p-2 border-cyan-400 rounded-lg flex justify-center items-center">
                      <button
                        onClick={() => {
                          decreaseAmount(index);
                        }}
                        className="bg-blue-400 h-6 w-6 rounded-md mx-2"
                      >
                        -
                      </button>
                      {quantity[index]}
                      <button
                        onClick={() => {
                          increaseAmount(index);
                        }}
                        className="bg-blue-400 h-6 w-6 rounded-md mx-2"
                      >
                        +
                      </button>
                    </div>
                    <button
  onClick={() => {
    removeItem(index);
  }}
  className="border border-black rounded-lg p-1 text-nowrap transform transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-black"
>
  Remove Item
</button>

                  </div>
                </div>
              ))}
              <button
                className={`w-10/12 h-10 rounded-md px-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-bold border transform transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-6 focus:ring-purple-300 ${myCart.length === 0 ? "hidden" : "opacity-100"}`}
                onClick={buyCartItems}
              >
                Buy Now All
              </button>

            </>
          )
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

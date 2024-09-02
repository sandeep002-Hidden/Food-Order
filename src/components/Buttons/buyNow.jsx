import React,{useState} from "react";

export default function BuyNowBtn(id) {
  const [message,setMessage]=useState("")
  const buyNow = async (id) => {
    try {
      await fetch(
        `http://localhost:8000/user/addToCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          body:JSON.stringify(id)
        }
      ).then(async(res)=>{
        const data=await res.json()
        if(!data.success){
          setMessage(data.message)
        }
      })
    } catch (error) {
      setMessage(error.message)
    }
  };
  return (
    <>
      <button
        className="w-fit h-10 rounded-md px-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-bold border"
        onClick={() => buyNow(id)}
      >
        Buy Now
      </button>
    </>
  );
}

import React, {  } from "react";

export default function Cancel(id) {
    const cancelOrder=async(e)=>{
        e.stopPropagation();
        try{

        
        await fetch("https://foodorderbackend-8yh4.onrender.com/user/cancelOrder",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(id)
          }).then(async(res)=>{
            const response=await res.json()
            if(!response.success){
                console.log(response.message)
            }
          })
        }
        catch(error){
            console.log(error.message)
        }
    }
    return (
        <>
            <button
                className="h-fit w-fit bg-red-500 text-white font-bold py-2 px-4 rounded-xl transform transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-200"
                onClick={(e)=>cancelOrder(e)}
            >
                Cancel
            </button>
        </>
    )
}
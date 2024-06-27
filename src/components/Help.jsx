import Header from "./Header";
import { useEffect,useState } from "react";
export default function Help(){
    const[message,setMessage]=useState([])
    useEffect(()=>{

        const makeAdmin=async(token)=>{
            try {
                const res= await fetch("https://localhost:8000/admin/getUserDetails",{
                    method:"GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token,
                      },
                })
                if(!res.ok){
                    setMessage("Error try again after sometime")
                }
                
            } catch (error) {
                
            }
        }
        if(localStorage.getItem("token")){
            makeAdmin(localStorage.getItem("token"))
        }
        else{
            setMessage("Login To continue")
        }
    },[])
    return(
        <>
        <Header/>
        <h1>{message}</h1>
        <div>Become a Seller <button className="border border-black rounded-lg p-1">click Here To Continue!</button> </div>

        </>
    )
}
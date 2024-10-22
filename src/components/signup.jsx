import React, { useState } from "react"

export default function SignUp() {
  const [message, setMessage] = useState("")
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    text: "",
    userPassword: "",
    confirmUserPassword: "",
    phoneNo: "",
    country: "India",
    State: "",
    District: "",
    Pin: "",
    Location: "",
  })
  const signUser = async () => {
    if (user.userPassword !== user.confirmUserPassword) {
      setMessage("ReEnter Your password")
    }
    else {
      try {
        await fetch(`https://foodorderbackend-8yh4.onrender.com/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }).then(async (res) => {
          const data = await res.json()
          if(!data.success){
            setMessage(data.message)
          }
          else{
            setMessage("User registered success fully, go for login")
          }
        })
      }
      catch (error) {
        setMessage("Error occur during register ,Try again after some time")
      }
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-fit w-screen">
        <div className="border-2 border-purple-400 rounded-lg m-4 p-2 md:w-1/2 ">
          <div className="flex justify-center items-center h-fit flex-col rounded-lg p-2">
            <h1>{message}</h1>
            <label className="block text-sm font-medium text-gray-700">
              Enter Your Name
              <input
                type="text"
                placeholder="Sandeep Mohapatra"
                className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
                onChange={(e) => {
                  setUser({ ...user, userName: e.target.value });
                }}
                required
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Enter Your Email
              <input
                type="email"
                placeholder="abcde123@gmail.com"
                className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
                onChange={(e) => {
                  setUser({ ...user, userEmail: e.target.value });
                }}
                required
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Enter Password
              <input
                type="text"
                placeholder="aEdfod123"
                className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
                onChange={(e) => {
                  setUser({ ...user, userPassword: e.target.value });
                }}
                required
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Re-enter Your Password
              <input
                type="password"
                placeholder="Re-enter Your Password"
                className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
                onChange={(e) => {
                  setUser({ ...user, confirmUserPassword: e.target.value });
                }}
                required
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Enter Your Phone No
              <input
                type="number"
                placeholder="Enter Your Phone No"
                className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
                onChange={(e) => {
                  setUser({ ...user, phoneNo: e.target.value });
                }}
                required
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Enter Country
              <input
                type="text"
                placeholder="Enter Country"
                className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
                onChange={(e) => {
                  setUser({ ...user, country: e.target.value });
                }}
                required
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Enter State Name
              <input
                type="text"
                name="State"
                placeholder="Enter State Name"
                className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
                onChange={(e) => {
                  setUser({ ...user, State: e.target.value });
                }}
                required
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Enter District Name
              <input
                type="text"
                placeholder="Enter District Name"
                className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
                onChange={(e) => {
                  setUser({ ...user, District: e.target.value });
                }}
                required
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Enter Pin
              <input
                type="number"
                placeholder="Enter Pin"
                className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
                onChange={(e) => {
                  setUser({ ...user, Pin: e.target.value });
                }}
                required
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Enter Location
              <input
                type="text"
                placeholder="Enter Location"
                className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
                onChange={(e) => {
                  setUser({ ...user, Location: e.target.value });
                }}
              />
            </label>

            <button onClick={signUser}
              className="border border-black rounded-lg px-4 py-2">
              Create Profile
            </button>
          </div>

          <p className="text-center">
            Already have an account ?
            <a href="/login" className="text-red-400">
              Login to continue
            </a>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

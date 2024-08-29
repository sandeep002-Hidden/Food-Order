import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
const Profile = () => {
  const [message, setMessage] = useState(" ");
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    userName: "",
    userEmail: "",
    phoneNo: "",
    Country: "",
    State: "",
    District: "",
    Pin: "",
    Location: "",
    OrderHistory: []
  });


  useEffect(() => {
    const fetchProfile = async () => {

      try {
        const response = await fetch(`http://localhost:8000/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });
        const data = await response.json();
        if(!data.success){
          throw new Error("Error while verifying token");
        }
        console.log(data)
        setProfileData(data.user);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  const editProfile = async () => {
    setEdit(!edit)
    const profileDetails = document.getElementsByClassName("profileDetails");
    for (let i = 0; i < profileDetails.length; i++) {
      profileDetails[i].readOnly = true;
    }
    const userName = document.getElementById("newName").value;
    const userEmail = document.getElementById("newEmail").value;
    const phoneNo = document.getElementById("newMobileNo").value;
    const token = localStorage.getItem("token");
    const data = {
      userName,
      userEmail,
      phoneNo,
      token,
    };
    try {
      const response = await fetch(
        "http://localhost:8000/user/updateProfile",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        setMessage("Your Profile Updated Successfully");
      } else {
        setMessage(
          "Error occur while updating Profile Details. Please try again!"
        );
      }
    } catch (error) {
      setMessage(
        "Error occur while updating Profile Details. Please try again!"
      );
    }

  };
  const handelLogOut = async () => {
    await fetch(`http://localhost:8000/user/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    }).then(async(res)=>{
      const logoutRes=await res.json()
      console.log(logoutRes)
      if(!logoutRes.success){
        setMessage(logoutRes.message)
      }
      else{
        navigate("/");
      }
    })
  };
  const deleteAccount = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/user/deleteAccount", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        setMessage(
          "Error occur while updating Profile Details. Please try again!!"
        );
      }
    } catch (error) {
      setMessage(
        "Error occur while updating Profile Details. Please try again!"
      );
    }
  };
  return (
    <>
      <Header />
      <h1 className="text-center my-2">{message}</h1>
      <div className="flex justify-center items-center my-8 font-serif overflow-x-hidden">
        <div className="w-4/5 md:h-screen flex justify-center items-start flex-col md:flex-row">
          <div className="w-full md:w-1/4 h-full">
            <div className="w-full h-fit border-double border-2 border-highlight rounded-2xl">
              <h1 className="py-1 px-4 text-black font-semibold text-lg ">
                👤 Hello
              </h1>
              <h1 className="px-12 font-black text-xl">
                {profileData.userName}
              </h1>
              <p className="p-3"></p>
            </div>
            <div className=" my-2 border-double border-2 border-highlight rounded-2xl">
              <h1 className="w-full mx-8 font-black text-lg">Location</h1>
              <div className="h-fit w-full  px-12">
                <p className="my-2">Country-{profileData.Country}</p>
                <p className="my-2">State-{profileData.State}</p>
                <p className="my-2">District-{profileData.District}</p>
                <p className="my-2">Pin-{profileData.Pin}</p>
                <p className="my-2">Location-{profileData.Location}</p>
              </div>
            </div>
            <div className="border-double border-2 border-highlight rounded-2xl">
              <h1 className="w-full mx-8 font-black text-lg">Order History</h1>
              <div>
                {profileData.OrderHistory.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </div>
            <div className="border-double border-2 border-highlight rounded-2xl my-1">
              <h1 className="w-full mx-8 font-black text-lg ">Track orders</h1>
            </div>
          </div>
          <div className="w-full md:w-3/4 h-fit border-double border-2 border-highlight rounded-2xl px-6 py-2">
            <div className="w-full h-min flex  justify-around  items-center">
              <h1 className="inline">Personal Information</h1>
              <button onClick={editProfile} className="border border-black rounded-lg p-1">
                {edit ? "Save" : "Edit profile"}
              </button>
            </div>
            <div className="h-fit w-screen my-6 ">
              <h2 className="inline mx-12 text-lg font-medium ">Full Name</h2>
              <input
                type="text"
                className="outline-none md:w-96 px-4 py-2 m-2 font-black text-black border border-black rounded-xl"
                placeholder={profileData.userName}
                readOnly={!edit}
                required
              />
              <br />
              <h2 className="inline mx-12 text-lg font-medium ">
                Email address
              </h2>
              <input
                type="email"
                className=" outline-none md:w-96 px-4 py-2 m-2 font-black text-black border border-black  rounded-xl"
                placeholder={profileData.userEmail}
                readOnly={!edit}
                required
              />
              <br />
              <h2 className="inline mx-12 text-lg font-medium ">Mobile No</h2>
              <input
                type="number"
                className=" outline-none md:w-96 px-4 py-2 m-2 font-black text-black border border-black  rounded-xl"
                placeholder={profileData.phoneNo}
                readOnly={!edit}
                required
              />
              <br />
            </div>
            <div
              id="btnSDiv"
              className="flex justify-between items-center w-full"
            >
              <button id="deleteBtn" onClick={deleteAccount} className="border border-black rounded-lg p-1">
                Delete account
              </button>
              <button onClick={handelLogOut} className="border border-black rounded-lg p-1">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

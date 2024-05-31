import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [message, setMessage] = useState(" ");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found");
        setLoading(false);
      }

      try {
        const response = await fetch("http://localhost:8000/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Error while verifying token");
        }

        const data = await response.json();
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
    return (
      <>
        <Header />
        <div className="h-screen  flex justify-center items-center">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
            disabled=""
          >
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading profile Details...
          </button>
        </div>
      </>
    );
  }
  const editProfile = async () => {
    const btn = document.getElementById("editBtn");
    const btnText = btn.innerText;
    const profileDetails = document.getElementsByClassName("profileDetails");

    if (btnText === "Edit Profile") {
      btn.innerText = "Save";
      for (let i = 0; i < profileDetails.length; i++) {
        profileDetails[i].readOnly = false;
      }
    } else if (btnText === "Save") {
      btn.innerText = "Edit Profile";
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
    }
  };
  const handelLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const deleteAccount = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/user/deleteAccount", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
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
        <div className="w-4/5 h-screen flex justify-center items-top ">
          <div className="w-1/4 h-full">
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
                {profileData.OrderHistory.map((item) => (
                  <div>{item}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-3/4 h-fit border-double border-2 border-highlight rounded-2xl px-6 py-2">
            <div className="w-full h-min flex  justify-around  items-center">
              <h1 className="inline">Personal Information</h1>
              <button id="editBtn" onClick={editProfile}>
                Edit Profile
              </button>
            </div>
            <div className="h-fit w-screen my-6">
              <h2 className="inline mx-12 text-lg font-medium ">Full Name</h2>
              <input
                type="text"
                className="profileDetails outline-none w-96 px-4 py-2 m-2 font-black text-black border border-black rounded-xl"
                placeholder={profileData.userName}
                id="newName"
                readOnly
                required
              />
              <br />
              <h2 className="inline mx-12 text-lg font-medium ">
                Email address
              </h2>
              <input
                type="email"
                className="profileDetails outline-none w-96 px-4 py-2 m-2 font-black text-black border border-black  rounded-xl"
                placeholder={profileData.userEmail}
                id="newEmail"
                readOnly
                required
              />
              <br />
              <h2 className="inline mx-12 text-lg font-medium ">Mobile No</h2>
              <input
                type="number"
                className="profileDetails outline-none w-96 px-4 py-2 m-2 font-black text-black border border-black  rounded-xl"
                placeholder={profileData.phoneNo}
                id="newMobileNo"
                readOnly
                required
              />
              <br />
            </div>
            <div
              id="btnSDiv"
              className="flex justify-between items-center w-full"
            >
              <button id="deleteBtn" onClick={deleteAccount}>
                Delete account
              </button>
              <button onClick={handelLogOut}>Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

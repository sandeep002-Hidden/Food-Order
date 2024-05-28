import React, { useState, useEffect } from "react";
import Header from "./Header";

const Profile = () => {
  const [message, setMessage] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <h1 className="text-center">Loading...</h1>
      </>
    );
  }

  const editProfile = () => {
    document.getElementById("editBtn").innerText = "Cancel";
  };
  return (
    <>
      <Header />
      <h1>{message}</h1>
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
                className="outline-none w-96 px-4 py-2 m-2 font-black text-black border border-black rounded-xl"
                placeholder={profileData.userName}
                readOnly
              />
              <br />
              <h2 className="inline mx-12 text-lg font-medium ">
                Email address
              </h2>
              <input
                type="text"
                className="outline-none w-96 px-4 py-2 m-2 font-black text-black border border-black  rounded-xl"
                placeholder={profileData.userEmail}
                readOnly
              />
              <br />
              <h2 className="inline mx-12 text-lg font-medium ">Mobile No</h2>
              <input
                type="text"
                className="outline-none w-96 px-4 py-2 m-2 font-black text-black border border-black  rounded-xl"
                placeholder={profileData.phoneNo}
                readOnly
              />
              <br />
            </div>
            <button id="deleteBtn">Delete account</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

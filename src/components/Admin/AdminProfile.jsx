import React, { useState, useEffect } from "react";
import AdminHeader from "./AHeader";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

const Profile = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(" ");
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [profileData, setProfileData] = useState({
    SellerName: "",
    SellerEmail: "",
    phoneNo: "",
    Country: "",
    State: "",
    District: "",
    Pin: "",
    Location: "",
  });
  const [newUser, setNewUser] = useState({
    SellerName: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/getDetails", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error("Error while verifying token");
        }
        const data = await response.json();
        setProfileData(data.seller);
        setNewUser({ SellerName: data.seller.SellerName }); // Initialize newUser with existing profile data
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const editProfile = async () => {
    setEdit(!edit);
    if (edit) {
      setLoading(true)
      try {
        const response = await fetch(
          "http://localhost:8000/admin/updateProfile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify( newUser ),
          }
        );
        if (response.ok) {
          setLoading(false)
          setMessage("Your Profile Updated Successfully");
        } else {
          setLoading(false)
          setMessage("Error occurred while updating Profile Details. Please try again!");
        }
      } catch (error) {
        setMessage("Error occurred while updating Profile Details. Please try again!");
      } finally {
        setEdit(false);
        setLoading(false)
      }
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:8000/admin/deleteAccount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })
      if (response.ok) {
        navigate("/");
      } else {
        setMessage("Error occurred while deleting the account. Please try again!");
      }
    } catch (error) {
      setMessage(error.message);
    }
    finally{
      setLoading(false)
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
  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          <AdminHeader />
          <h1 className="text-center my-2">{message}</h1>
          <div className="flex justify-center items-center my-8 font-serif overflow-x-hidden">
            <div className="w-4/5 md:h-screen flex justify-center items-start flex-col md:flex-row">
              <div className="w-full md:w-1/4 h-full">
                <div className="w-full h-fit border-double border-2 border-highlight rounded-2xl">
                  <h1 className="py-1 px-4 text-black font-semibold text-lg ">
                    👤 Hello
                  </h1>
                  <h1 className="px-12 font-black text-xl">
                    {profileData.SellerName}
                  </h1>
                </div>
                <div className="my-2 border-double border-2 border-highlight rounded-2xl">
                  <h1 className="w-full mx-8 font-black text-lg">Location</h1>
                  <div className="h-fit w-full px-12">
                    <p className="my-2">Country - {profileData.Country}</p>
                    <p className="my-2">State - {profileData.State}</p>
                    <p className="my-2">District - {profileData.District}</p>
                    <p className="my-2">Pin - {profileData.Pin}</p>
                    <p className="my-2">Location - {profileData.Location}</p>
                  </div>
                </div>
                <div className="border-double border-2 border-highlight rounded-2xl">
                  <h1 className="w-full mx-8 font-black text-lg">Delivery History</h1>
                </div>
              </div>
              <div className="w-full md:w-3/4 h-fit border-double border-2 border-highlight rounded-2xl px-6 py-2">
                <div className="w-full h-min flex justify-around items-center">
                  <h1 className="inline">Personal Information</h1>
                  <button id="editBtn" onClick={editProfile}>
                    {edit ? "Save" : "Edit Profile"}
                  </button>
                </div>
                <div className="h-fit w-screen my-6">
                  <h2 className="inline mx-12 text-lg font-medium ">Full Name</h2>
                  <input
                    type="text"
                    className="profileDetails outline-none w-96 px-4 py-2 m-2 font-black text-black border border-black rounded-xl"
                    placeholder={profileData.SellerName || "Enter Seller Name"}
                    value={newUser.SellerName}
                    onChange={(e) => setNewUser({ ...newUser, SellerName: e.target.value })}
                    required
                    readOnly={!edit}
                  />
                  <br />
                  <h2 className="inline mx-12 text-lg font-medium ">Email address</h2>
                  <input
                    type="email"
                    className="profileDetails outline-none w-96 px-4 py-2 m-2 font-black text-black border border-black rounded-xl"
                    placeholder={profileData.SellerEmail || "Seller Email"}
                    value={profileData.SellerEmail}
                    readOnly
                    required
                  />
                  <br />
                  <h2 className="inline mx-12 text-lg font-medium ">Mobile No</h2>
                  <input
                    type="text"
                    className="profileDetails outline-none w-96 px-4 py-2 m-2 font-black text-black border border-black rounded-xl"
                    placeholder={profileData.phoneNo || "Seller PhoneNo"}
                    value={profileData.phoneNo}
                    readOnly
                    required
                  />
                  <br />
                </div>
                <div id="btnSDiv" className="flex justify-between items-center w-full">
                  <button  onClick={deleteAccount}>
                    Delete account
                  </button>
                  <button onClick={handelLogOut}>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

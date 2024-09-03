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
            body: JSON.stringify(newUser),
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
    finally {
      setLoading(false)
    }
  };
  const handelLogOut = async () => {
    try {
      setLoading(true)
      await fetch(`http://localhost:8000/user/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      }).then(async (res) => {
        const logoutRes = await res.json()
        console.log(logoutRes)
        if (!logoutRes.success) {
          setMessage(logoutRes.message)
        }
        else {
          navigate("/");
        }
      })
    }
    catch (error) {
      console.log(error.message)
    }
    finally {
      setLoading(false)
    }
  };
  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          <AdminHeader />
          <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
            <h1 className="text-3xl font-semibold text-center my-6">{message}</h1>
            <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="md:w-1/4 p-6 border-r border-gray-200">
                <div className="mb-6 border-double border-2 border-highlight rounded-2xl p-4">
                  <h1 className="text-xl font-semibold text-black">👤 Hello</h1>
                  <h2 className="text-2xl font-bold">{profileData.SellerName}</h2>
                </div>

                <div className="mb-6 border-double border-2 border-highlight rounded-2xl p-4">
                  <h1 className="text-lg font-bold">Location</h1>
                  <div className="space-y-2">
                    <p>Country: {profileData.Country}</p>
                    <p>State: {profileData.State}</p>
                    <p>District: {profileData.District}</p>
                    <p>Pin: {profileData.Pin}</p>
                    <p>Location: {profileData.Location}</p>
                  </div>
                </div>

                <div className="border-double border-2 border-highlight rounded-2xl p-4">
                  <h1 className="text-lg font-bold">Delivery History</h1>
                  {/* Delivery History content here */}
                </div>
              </div>

              <div className="md:w-3/4 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-xl font-semibold">Personal Information</h1>
                  <button
                    id="editBtn"
                    onClick={editProfile}
                    className="border border-black rounded-lg px-4 py-2 text-white bg-purple-500 hover:bg-purple-600 transform transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    {edit ? "Save" : "Edit Profile"}
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <h2 className="text-lg font-medium w-1/4">Full Name</h2>
                    <input
                      type="text"
                      className="outline-none w-3/4 px-4 py-2 font-semibold border border-gray-300 rounded-md"
                      placeholder={profileData.SellerName || "Enter Seller Name"}
                      value={newUser.SellerName}
                      onChange={(e) => setNewUser({ ...newUser, SellerName: e.target.value })}
                      required
                      readOnly={!edit}
                    />
                  </div>
                  <div className="flex items-center">
                    <h2 className="text-lg font-medium w-1/4">Email address</h2>
                    <input
                      type="email"
                      className="outline-none w-3/4 px-4 py-2 font-semibold border border-gray-300 rounded-md"
                      placeholder={profileData.SellerEmail || "Seller Email"}
                      value={profileData.SellerEmail}
                      readOnly
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <h2 className="text-lg font-medium w-1/4">Mobile No</h2>
                    <input
                      type="text"
                      className="outline-none w-3/4 px-4 py-2 font-semibold border border-gray-300 rounded-md"
                      placeholder={profileData.phoneNo || "Seller PhoneNo"}
                      value={profileData.phoneNo}
                      readOnly
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between space-x-4">
                  <button
                    onClick={deleteAccount}
                    className="border border-black rounded-lg px-4 py-2 text-white bg-red-500 hover:bg-red-600 transform transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Delete Account
                  </button>
                  <button
                    onClick={handelLogOut}
                    className="border border-black rounded-lg px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 transform transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
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

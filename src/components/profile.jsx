import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import Cancel from "./Buttons/cancel";
const Profile = () => {
  const [message, setMessage] = useState(" ");
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userHistory, setuserHistory] = useState([])
  const [userOHistory, setuserOHistory] = useState([])
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
  const [newUser, setNewUser] = useState({
    userName: ""
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
        if (!data.success) {
          throw new Error("Error while verifying token");
        }
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
    if(!edit){
      return
    }
    try {
      const response = await fetch(
        "http://localhost:8000/user/updateProfile",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          body: JSON.stringify(newUser),
        }
      );
      if (response.ok) {
        setMessage("Your Profile Updated Successfully");
        navigate("/Profile")
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
    }).then(async (res) => {
      const logoutRes = await res.json()
      if (!logoutRes.success) {
        setMessage(logoutRes.message)
      }
      else {
        navigate("/");
      }
    })
  };
  const deleteAccount = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/deleteAccount", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      if (response.ok) {
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
  const PendingOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/user/pendingOrderHistory",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        }
      );
      const data = await response.json()
      setuserHistory(data.userHistory)
      console.log(data.userHistory)
    } catch (error) {
      setMessage(
        "Error occur while updating Profile Details. Please try again!"
      );
    }
  }
  const orderHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/user/getOrderHisory",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        }
      );
      const data= await response.json()
      if(!response.ok){
        setMessage(response.message)
      }
      else{
        setuserOHistory(data.OrderHistory)
        console.log(data.OrderHistory)
      }
    } catch (error) {
      setMessage(
        "Error occur while updating Profile Details. Please try again!"
      );
    }
  }
  const visitPendingOrders = async (id) => {
    navigate(`/Profile/pendingOrders/${id}`)
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center my-8 font-serif overflow-x-hidden">
          <h1>{message}</h1>
        <div className="w-full max-w-6xl md:h-screen flex flex-col md:flex-row">

          {/* Profile */}
          <div className="w-full md:w-1/4 h-full p-4">
            <div className="w-full h-fit border-double border-2 border-highlight rounded-2xl mb-4 p-4 bg-white shadow-lg">
              <h1 className="text-black font-semibold text-lg">👤 Hello</h1>
              <h2 className="text-xl font-black">{profileData.userName}</h2>
            </div>
            <div className="w-full mb-4 border-double border-2 border-highlight rounded-2xl p-4 bg-white shadow-lg">
              <h1 className="font-black text-lg">Location</h1>
              <div className="text-sm text-gray-700">
                <p className="my-1">Country: {profileData.Country}</p>
                <p className="my-1">State: {profileData.State}</p>
                <p className="my-1">District: {profileData.District}</p>
                <p className="my-1">Pin: {profileData.Pin}</p>
                <p className="my-1">Location: {profileData.Location}</p>
              </div>
            </div>
            <div className="border-double border-2 border-highlight rounded-2xl p-4 mb-4 bg-white shadow-lg">
              <button
                className="w-full bg-purple-500 text-white font-black text-lg py-2 rounded-lg hover:bg-purple-600 transition duration-200"
                onClick={orderHistory}
              >
                Order History
              </button>
              <button
                className="w-full bg-purple-500 text-white font-black text-lg py-2 rounded-lg hover:bg-purple-600 transition duration-200 mt-4"
                onClick={PendingOrder}
              >
                Pending Orders
              </button>
            </div>
          </div>
          <div className="w-full md:w-3/4 flex justify-start items-start flex-col">
          {/* Personal Info */}
          <div className="w-full h-fit border-double border-2 border-highlight rounded-2xl p-6 bg-white shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-semibold">Personal Information</h1>
              <button
                onClick={editProfile}
                className="border border-black rounded-lg p-2 text-nowrap transform transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-black"
              >
                {edit ? "Save" : "Edit Profile"}
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Full Name</h2>
                <input
                      type="text"
                      className="outline-none w-3/4 px-4 py-2 font-semibold border border-gray-300 rounded-md"
                      placeholder={profileData.userName || "Enter Seller Name"}
                      value={newUser.userName ||profileData.userName}
                      onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
                      required
                      readOnly={!edit}
                    />
              </div>
              <div>
                <h2 className="text-lg font-medium">Email Address</h2>
                <input
                  type="email"
                  className="outline-none md:w-96 px-4 py-2 font-black text-black border border-black rounded-xl"
                  value={profileData.userEmail}
                  readOnly
                  required
                />
              </div>
              <div>
                <h2 className="text-lg font-medium">Mobile No</h2>
                <input
                  type="text"
                  className="outline-none md:w-96 px-4 py-2 font-black text-black border border-black rounded-xl"
                  value={profileData.phoneNo}
                  readOnly
                  required
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={deleteAccount}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg transform transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-200"
                >
                  Delete Account
                </button>
                <button
                  onClick={handelLogOut}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transform transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
            {/* User History  */}
          <div className="w-full min-h-44 max-w-6xl mt-8 overflow-x-auto">
          {userHistory && userHistory.length > 0 && (
            <div className="w-full h-44 flex flex-wrap justify-center gap-4">
              {userHistory.map((item, index) => (
                <div
                  key={item._id}
                  className="h-36 w-full border-2 border-purple-400 rounded-xl flex justify-around items-center m-2 overflow-hidden transition-shadow hover:shadow-lg shadow-sm hover:border-purple-500 bg-white"
                  onClick={() => visitPendingOrders(item._id)}
                >
                  <img
                    src={item.coverImageLink.ImageLink||""}
                    alt={`Order ${index + 1} `}
                    className="w-32 h-24 object-cover"
                  />
                  <div className="p-2">
                    <p className="font-bold text-base text-black">{`Order ${index + 1}`}</p>
                    <p className="text-base font-semibold text-black">order status -<span className="text-red-500">{item.orderStatus||""}</span></p>
                    <p className="text-base font-semibold text-black">Total Price - <span className="text-green-500">{item.TotalPrice+40||""} ₹</span></p>
                    <p className="text-sm font-semibold text-black">Order time -<span className="text-blue-500">{item.OrderTime||""}</span></p>
                  </div>
                  <Cancel id={item._id}/>
                </div>
              ))}
            </div>
          )}
        </div>
          <div className="w-full min-h-44 max-w-6xl mt-8 overflow-x-auto">
          {userOHistory && userOHistory.length > 0 && (
            <div className="w-full h-44 flex flex-wrap justify-center gap-4">
              {userOHistory.map((item, index) => (
                <div
                  key={item._id}
                  className="h-36 w-fit border-2 border-purple-400 rounded-xl flex justify-start items-center m-2 overflow-hidden transition-shadow hover:shadow-lg shadow-sm hover:border-purple-500 bg-white"
                >
                  <div className="p-2">
                    <p className="font-bold text-base text-black">{`Order ${index + 1}`}</p>
                    <p className="text-base font-semibold text-black">Delivery Agent Name -<span className="text-red-500">{item.DeliverAgentName||""}</span></p>
                    <p className="text-base font-semibold text-black">Delivery Agent phoneNo - <span className="text-green-500">{item.DeliverAgentPhoneNo||""} ₹</span></p>
                    <p className="text-sm font-semibold text-black">Total price -<span className="text-blue-500">{item.TotalPrice||""}</span></p>
                    <p className="text-sm font-semibold text-black">No of Items -<span className="text-black">{item.Items.length}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
        </div>

        
      </div>







    </>
  );
};

export default Profile;

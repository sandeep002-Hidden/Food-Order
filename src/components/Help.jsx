import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"
export default function Help() {
  const [message, setMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isVerifyBtnVisible, setIsVerifyBtnVisible] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [sellerDetails, setSellerDetails] = useState({
    SellerName: "",
    SellerEmail: "",
    SellerPassword: "",
    PhoneNo: "",
    Country: "",
    State: "",
    District: "",
    Pin: "",
    Location: "",
    UserOtp: "",
    ActualOtp: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Login to Continue");
      setAuthUser(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const sendMail = async (email) => {
    try {
      const emailRes = await fetch(`http://localhost:8000/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: email }),
      });
      const emailResponse = await emailRes.json();
      setSellerDetails((prevDetails) => ({
        ...prevDetails,
        ActualOtp: emailResponse.Otp,
      }));
      setIsVerifyBtnVisible(true);
    } catch (error) {
      setMessage(
        "Error occurred while sending email, try again after some time"
      );
    }
  };

  const verifyOtp = () => {
    if (sellerDetails.UserOtp === sellerDetails.ActualOtp) {
      setIsOtpVerified(true);
    } else {
      setMessage("Wrong OTP. Try again after some time.");
    }
  };

  const makeSellerProfile = async () => {
    const token = localStorage.getItem("token");
    const profileRes = await fetch(
      `http://localhost:8000:8000/admin/makeAdmin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...sellerDetails, token }),
      }
    );
    if (!profileRes.ok) {
      setMessage("Try again after some time");
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      {authUser&&
      <h1 className=" text-red-500 font-bold text-lg text-center my-4 min-h-50vh">{message}</h1>
}
      {!authUser && (
        
        <div className="flex my-12 justify-center items-start">
                <h1 className=" text-red-500 font-bold text-lg text-center my-4 min-h-50vh">{message}</h1>

          <div className="w-3/4">
            {!isFormVisible && (
              <div className="mx-12">
                Become a Seller{" "}
                <button
                  className="border border-black rounded-lg p-1"
                  onClick={() => setIsFormVisible(true)}
                >
                  Click Here To Continue!
                </button>
              </div>
            )}
            {isFormVisible && (
              <div className="w-1/2 flex justify-center items-stretch flex-col bg-zinc-200 p-4">
                <input
                  type="text"
                  placeholder="Seller Name"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="SellerName"
                  value={sellerDetails.SellerName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Seller Email"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="SellerEmail"
                  value={sellerDetails.SellerEmail}
                  onChange={handleChange}
                  required
                />
                <div className="h-full w-full flex justify-center items-center">
                  <button
                    onClick={() => sendMail(sellerDetails.SellerEmail)}
                    className="h-fit w-fit border-2 border-highlight px-3 py-1 rounded-lg"
                  >
                    Send Email
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="UserOtp"
                  value={sellerDetails.UserOtp}
                  onChange={handleChange}
                />
                {isVerifyBtnVisible && (
                  <div className="h-full w-full flex justify-center items-center">
                    <button
                      onClick={verifyOtp}
                      className="h-fit w-fit border-2 border-highlight px-3 py-1 rounded-lg"
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="SellerPassword"
                  value={sellerDetails.SellerPassword}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Phone No"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="PhoneNo"
                  value={sellerDetails.PhoneNo}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="Country"
                  value={sellerDetails.Country}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="State"
                  value={sellerDetails.State}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="District"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="District"
                  value={sellerDetails.District}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Pin"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="Pin"
                  value={sellerDetails.Pin}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="Location"
                  value={sellerDetails.Location}
                  onChange={handleChange}
                  required
                />
                {isOtpVerified && (
                  <div className="h-full w-full flex justify-center items-center">
                    <button
                      className="h-fit w-fit border-2 border-highlight px-3 py-1 rounded-lg"
                      onClick={makeSellerProfile}
                    >
                      Create My Seller Profile
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
<Footer/>
    </>
  );
}

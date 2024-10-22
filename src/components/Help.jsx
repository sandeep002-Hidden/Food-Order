import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"
import LoadingScreen from "./LoadingScreen"
export default function Help() {
  const [message, setMessage] = useState("");
  const [gMessage, setGMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isVerifyBtnVisible, setIsVerifyBtnVisible] = useState(false);
  const [isDeliveryFormVisible, setIsDeliveryFormVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    PhoneNo: "",
    Country: "",
    State: "",
    District: "",
    Pin: "",
    Location: "",
    UserOtp: "",
    ActualOtp: "",
  })
  const [sellerDetails, setSellerDetails] = useState({
    SellerName: "",
    SellerEmail: user.userEmail,
    SellerPassword: "",
    phoneNo: "",
    Country: "",
    State: "",
    District: "",
    Pin: "",
    Location: "",
    UserOtp: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://foodorderbackend-8yh4.onrender.com/user/profile`, {
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

        setUser({
          userName: data.user.userName,
          userEmail: data.user.userEmail,
          userPassword: data.user.userPassword,
          PhoneNo: data.user.phoneNo,
          Country: data.user.country,
          State: data.user.State,
          District: data.user.District,
          Pin: data.user.Pin,
          Location: data.user.Location,
          UserOtp: data.user.UserOtp,
          ActualOtp: data.user.ActualOtp,
        });

      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProfile();
  }, [isFormVisible]);
  useEffect(() => {
    setSellerDetails({
      SellerEmail: user.userEmail,
      phoneNo: user.PhoneNo,
      Country: user.Country,
      State: user.State,
      District: user.District,
      Pin: user.Pin,
      Location: user.Location,
      UserOtp: user.UserOtp,
    }
    );
  }, [user]);
  const checkUser = async (a) => {
    try {
      setLoading(true)
      await fetch(`https://foodorderbackend-8yh4.onrender.com/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      }).then(async (res) => {
        const checkUserRes = await res.json();
        if (!checkUserRes.success) {
          setMessage(checkUserRes.message)
        }
        else {
          if (a == 0) {
            setIsFormVisible(true)
            setIsDeliveryFormVisible(false)
          }
          else if (a == 1) {
            setIsFormVisible(false)
            setIsDeliveryFormVisible(true)
          }
        }
      })
    } catch (error) {
      setMessage(error.message)
    }
    finally {
      setLoading(false)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const sendMail = async (email) => {
    try {
      setLoading(true)
      const emailRes = await fetch(`https://foodorderbackend-8yh4.onrender.com/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({ userEmail: email }),
      });
      const emailResponse = await emailRes.json();
      setSellerDetails((prevDetails) => ({
        ...prevDetails,
        ActualOtp: emailResponse.Otp,
      }));
      setSellerDetails((prevDetails) => ({
        ...prevDetails,
        ActualOtp: emailResponse.Otp,
      }));
      setIsVerifyBtnVisible(true);
    } catch (error) {
      setMessage(
        "Error occurred while sending email, try again after some time"
      );
    } finally {
      setLoading(false)
    }
  };
  const verifyOtp = () => {
    if (sellerDetails.UserOtp == sellerDetails.ActualOtp) {
      setGMessage("otp verified ✅")
      setMessage("")
      setIsOtpVerified(true);
    } else {
      setGMessage("")
      setMessage("Wrong OTP ❌");
    }
  };
  const makeSellerProfile = async () => {
    try {
      setLoading(true)
      const profileRes = await fetch(`https://foodorderbackend-8yh4.onrender.com/admin/makeAdmin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...sellerDetails }),
        }
      );
      if (!profileRes.ok) {
        setMessage("Try again after some time");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  };
  const makeDeliveryAgent = async () => {
    try {
      const profileRes = await fetch(`https://foodorderbackend-8yh4.onrender.com/agent/makeAgent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(sellerDetails),
        }
      );
      const res=await profileRes.json()
      if (!profileRes.ok || !res.success) {
        setMessage("Try again after some time");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <>
      <Header />
      {!loading && (


        <div className={`my-12 min-h-50vh ${isFormVisible || isDeliveryFormVisible ? "flex justify-center items-center flex-col" : ""}`}>
          <div>
            <h1 className=" text-red-500 font-normal text-lg text-center my-4 h-fit flex-col">
              {message}
            </h1>
            <h1 className=" text-green-500 font-normal text-lg text-center my-4 h-fit flex-col">
              {gMessage}
            </h1>
          </div>
          <div className="w-1/2 ">
            {(!isFormVisible && !isDeliveryFormVisible) && (
              <div className="mx-12">
                <div>
                  Open a cloud Kitchen
                  <button
                    className="border border-black rounded-lg p-1"
                    onClick={() => {
                      checkUser(0);
                    }}
                  >
                    Click here to verify
                  </button>
                </div>
                <div>
                  Become a delivery boy
                  <button
                    className="border border-black rounded-lg p-1"
                    onClick={() => {
                      checkUser(1);
                    }}
                  >
                    Click here to verify
                  </button>
                </div>
              </div>
            )}
            {(isFormVisible || isDeliveryFormVisible) && (
              <div className=" flex border-2 rounded-xl border-highlight  justify-center items-stretch flex-col bg-zinc-200 p-4">
                <label htmlFor="SellerName" className="font-semibold my-1">{isFormVisible ? `Kitchen Name` : `Agent Name`}</label>
                <input
                  type="text"
                  placeholder={isFormVisible ? "KFC" : "Jems Bond"}
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="SellerName"
                  id="SellerName"
                  value={sellerDetails.SellerName || ""}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="SellerEmail" className="font-semibold my-1">contact mail</label>
                <input
                  type="text"
                  placeholder="ex:- contact002infoordernow@gmail.com"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="SellerEmail"
                  id="SellerEmail"
                  value={sellerDetails.SellerEmail || ""}
                  onChange={handleChange}
                  required
                  readOnly
                />
                <div className="h-full w-full flex justify-center items-center">
                  <button
                    onClick={() => sendMail(sellerDetails.SellerEmail)}
                    className="h-fit w-fit border-2 border-highlight px-3 py-1 rounded-lg"
                  >
                    Send Email
                  </button>
                </div>

                <label htmlFor="UserOtp" className="font-semibold my-1">Enter OTP</label>
                <input
                  type="text"
                  placeholder="ex: 111111"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="UserOtp"
                  id="UserOtp"
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

                <label htmlFor="SellerPassword" className="font-semibold my-1">Password</label>
                <input
                  type="password"
                  placeholder="ex:- Seller@002OrderNow1"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="SellerPassword"
                  id="SellerPassword"
                  value={sellerDetails.SellerPassword || ""}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="PhoneNo" className="font-semibold my-1">Contact No</label>
                <input
                  type="text"
                  placeholder="ex:- 123456789"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="PhoneNo"
                  id="PhoneNo"
                  value={sellerDetails.phoneNo}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="Country" className="font-semibold my-1">Country</label>
                <input
                  type="text"
                  placeholder="ex:-India"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="Country"
                  id="Country"
                  value={sellerDetails.Country}
                  onChange={handleChange}
                  required

                />

                <label htmlFor="State" className="font-semibold my-1">State</label>
                <input
                  type="text"
                  placeholder="ex:-Odisha"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="State"
                  id="State"
                  value={sellerDetails.State}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="District" className="font-semibold my-1">District</label>
                <input
                  type="text"
                  placeholder="ex:-Kendrapada"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="District"
                  id="District"
                  value={sellerDetails.District}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="Pin" className="font-semibold my-1">Pin</label>
                <input
                  type="text"
                  placeholder="ex:- 754224"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="Pin"
                  id="Pin"
                  value={sellerDetails.Pin}
                  onChange={handleChange}
                />

                <label htmlFor="Location" className="font-semibold my-1">Location</label>
                <input
                  type="text"
                  placeholder="ex:- CHC6+HHF, Mahakalapada, Chadeiguan, Odisha 754213"
                  className="border border-black h-8 rounded-md p-1 my-2"
                  name="Location"
                  id="Location"
                  value={sellerDetails.Location}
                  onChange={handleChange}
                  required
                />


                <div className="h-full w-full flex justify-center items-center">
                  <button
                    className="h-fit w-fit border-2 border-highlight px-3 py-1 rounded-lg"
                    onClick={isFormVisible ? makeSellerProfile : makeDeliveryAgent}
                    disabled={!isOtpVerified}
                  >
                    {isOtpVerified ? `${isFormVisible ? `Create My seller Profile` : `Create Delivery Agent Profile`}` : `verify otp before continue`}
                  </button>
                </div>

              </div>

            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

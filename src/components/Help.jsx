import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Help() {
  const [message, setMessage] = useState([]);
  const [val1, val2] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState(false);
  const [verifyBtn, setVerifyBtn] = useState(false);
  const [SellerName, setSellerName] = useState();
  const [SellerEmail, setSellerEmail] = useState();
  const [SellerPassword, setSellerPassword] = useState();
  const [PhoneNo, setPhoneNo] = useState();
  const [Country, setCountry] = useState();
  const [State, setState] = useState();
  const [District, setDistrict] = useState();
  const [pin, setPin] = useState();
  const [Location, setLocation] = useState();
  const [userOtp, setUserOtp] = useState();
  const [actualOtp, setActualOtp] = useState();

  const navigate = useNavigate();



  const token = localStorage.getItem("token");
  if (!token) {
    setMessage("Login to Continue");
  }
  const sendmail = async (email) => {
    try {
      alert(email);
      const Email = { userEmail: email };

      const emailRes = await fetch("http://localhost:8000/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Email),
      });
      const emailResponse = await emailRes.json();
      setActualOtp(emailResponse.Otp);
    } catch (error) {
      setMessage("Error occur while sending email , try again after some time");
      console.log(error);
    }
  };
  const sellerData = {
    SellerName,
    SellerEmail,
    SellerPassword,
    PhoneNo,
    Country,
    State,
    District,
    pin,
    Location,
    token,
  };
  const makeSellerProfile = async () => {
    const profileRes = await fetch("http://localhost:8000/admin/makeAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sellerData),
    });
    if(!profileRes.ok){
      setMessage("Try again after some time")
    }
    else{
    const dataRes = await profileRes.json();
    console.log(dataRes);
    localStorage.removeItem("token")
    navigate("/login")
    }
  };
  return (
    <>
      <Header />
      <h1>{message}</h1>
      <div className="flex my-12 justify-center items-center">
        <div className="w-3/4">
          {!val1 && (
            <div className="mx-12">
              Become a Seller{" "}
              <button
                className="border border-black rounded-lg p-1"
                onClick={() => {
                  val2(true);
                }}
              >
                click Here To Continue!
              </button>
            </div>
          )}
          {val1 && (
            <div className=" w-1/2 flex justify-center items-stretch flex-col bg-zinc-200">
              <p className=" h-">Enter Your Seller Name - {SellerName}</p>
              <input
                type="text"
                placeholder="qwerty 002"
                className="border border-black h-8 rounded-md p-1 my-2"
                onChange={(e) => {
                  setSellerName(e.target.value);
                }}
                required
              />
              <p className=" h-6 bg-red-300 truncate">Enter Your Seller Email - {SellerEmail}</p>
              <input
                type="text"
                placeholder="qwerty002@gmail.com"
                className="border border-black h-8 rounded-md p-1 my-2"
                onChange={(e) => {
                  setSellerEmail(e.target.value);
                }}
                required
              />
              <div className="h-full w-full flex justify-center items-center">
                <button
                  onClick={() => {
                    sendmail(SellerEmail);
                    setVerifyBtn(true);
                  }}
                  className=" h-fit w-fit border-2 border-highlight px-3 py-1 rounded-lg"
                >
                  Send Email
                </button>
              </div>
              <p className=" h-6 bg-red-300 truncate">Enter the otp -{userOtp}</p>
              <input
                type="text"
                placeholder="Check your Email"
                className="border border-black h-8 rounded-md p-1 my-2"
                onChange={(e) => {
                  setUserOtp(e.target.value);
                }}
              />
              {verifyBtn && (
                <div className="h-full w-full flex justify-center items-center">
                  <button
                    onClick={() => {
                      if (userOtp == actualOtp) {
                        setVerifyPassword(true);
                      } else {
                        setMessage("Wrong otp try again after some time");
                      }
                    }}
                    className=" h-fit w-fit border-2 border-highlight px-3 py-1 rounded-lg"
                  >
                    Verify Otp
                  </button>
                </div>
              )}
              <p className=" h-6 bg-red-300 truncate">Enter the Password -{SellerPassword}</p>
              <input
                type="password"
                placeholder="OrderNow002"
                className="border border-black h-8 rounded-md p-1 my-2"
                onChange={(e) => {
                  setSellerPassword(e.target.value);
                }}
                required
              />
              <p className=" h-6 bg-red-300 truncate">Enter your phone no - {PhoneNo}</p>
              <input
                type="text"
                placeholder="9876543210"
                className="border border-black h-8 rounded-md p-1 my-2"
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
                required
              />
              <p className=" h-6 bg-red-300 truncate">Enter Your Country name - {Country}</p>
              <input
                type="text"
                placeholder="India"
                className="border border-black h-8 rounded-md p-1 my-2"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                required
              />
              <p className=" h-6 bg-red-300 truncate">Enter Your State Name - {State}</p>
              <input
                type="text"
                placeholder="qwerty"
                className="border border-black h-8 rounded-md p-1 my-2"
                onChange={(e) => {
                  setState(e.target.value);
                }}
                required
              />
              <p className=" h-6 bg-red-300 truncate">Enter Your District Name - {District}</p>
              <input
                type="text"
                placeholder="qwerty"
                className="border border-black h-8 rounded-md p-1 my-2"
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
                required
              />
              <p className=" h-6 bg-red-300 truncate">Enter Your Pin -{pin}</p>
              <input
                type="text"
                placeholder="123456"
                className="border border-black h-8 rounded-md p-1 my-2"
                onChange={(e) => {
                  setPin(e.target.value);
                }}
              />
              <p className=" h-6 bg-red-300 truncate">Enter Your Location - {Location}</p>
              <input
                type="text"
                placeholder="qwerty,qwerty,qwerty,123456"
                className="border border-black h-8 rounded-md p-1 my-2"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                required
              />
              {verifyPassword && (
                <div className="h-full w-full flex justify-center items-center">
                  <button
                    className=" h-fit w-fit border-2 border-highlight px-3 py-1 rounded-lg"
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
    </>
  );
}

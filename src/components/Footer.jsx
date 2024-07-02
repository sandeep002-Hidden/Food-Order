export default function Footer() {
  return (
    <>
    {/* <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-xl font-bold">Company Name</h2>
          <p className="text-gray-400">© 2024 Company Name. All rights reserved.</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          <a href="#" className="text-gray-400 hover:text-white mx-2 lg:mx-4 my-1 lg:my-0">About</a>
          <a href="#" className="text-gray-400 hover:text-white mx-2 lg:mx-4 my-1 lg:my-0">Contact</a>
          <a href="#" className="text-gray-400 hover:text-white mx-2 lg:mx-4 my-1 lg:my-0">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white mx-2 lg:mx-4 my-1 lg:my-0">Terms of Service</a>
        </div>
      </div>
    </footer> */}
      <div className="h-42 flex justify-center items-center border-t border-black my-4 ">
        <div className="w-11/12 ">
          <div className="h-fit w-80 p-4 flex justify-between items-start">
            <div>
              <h1 className="text-2xl w-full text-left font-black text-purple-600 font-serif">
                Order Now
              </h1>
              <div className="h-24 w-full flex justify-between items-start">
                <span className="text-6xl"> 🌏</span>
                <span className=" font-medium font-sans">
                  Chadaiguan, Mahakalpada, Kendrapada, Odisha, India, 754224
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            * @copyright all right reserved 2024
          </div>
        </div>
      </div>
    </>
  );
}

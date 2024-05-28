export default function SignUp() {
  return (
    <>
      <div className="flex justify-center items-center h-fit w-screen">
        <div className="border-2 border-purple-400 rounded-lg m-4 p-2 md:w-1/2 ">
          <form
            action="/signUp"
            method="post"
            className=" flex justify-center items-center h-fit flex-col rounded-lg p-2"
          >
            <input
              type="text"
              name="userName"
              id=""
              placeholder="Enter Your Name"
              className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
            />
            <input
              type="email"
              name="userEmail"
              id=""
              placeholder="Enter Your Email"
              className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
            />
            <input
              type="text"
              name="userPassword"
              id=""
              placeholder="Enter Password"
              className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
            />
            <input
              type="password"
              name="confirmUserPassword"
              id=""
              placeholder="Re enter Your Password"
              className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
            />
            <input
              type="number"
              name="phoneNo"
              placeholder="Enter Your phone No"
              className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"
            />
            <input
              type="text"
              name="country"
              placeholder="Enter Country Name"
              className="block h-12 w-64  md:w-96 border border-black rounded-md m-3 p-2 required"

            />
            <input
              type="text"
              name="State"
              placeholder="Enter State Name"
              className="block h-12 w-64  md:w-96 border border-black rounded-md m-3 p-2 required"

            />
            <input
              type="text"
              name="District"
              placeholder="Enter District Name"
              className="block h-12 w-64  md:w-96 border border-black rounded-md m-3 p-2 required"

            />
            <input
              type="number"
              name="Pin"
              placeholder="Enter Pin"
              className="block h-12 w-64  md:w-96 border border-black rounded-md m-3 p-2 required"

            />
            <input
              type="text"
              name="Location"
              placeholder="Enter Location"
              className="block h-12 w-64 md:w-96 border border-black rounded-md m-3 p-2 required"

            />
            
            <input
              type="submit"
              value="Create Profile"
              className="border border-black rounded-lg px-4 py-2"
            />
          </form>
          <p className="text-center">
            Already have an account ?
            <a href="/login" className="text-red-400">
              Login to continue
            </a>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

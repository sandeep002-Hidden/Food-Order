export default function ForgetPassword(){
    return(
        <>
        <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-fit w-fit m-8 border-2 border-purple-500 rounded-lg p-4">
          <form action="/forgetPassword" method="post" className=" flex justify-center items-center flex-col">
            <input
              type="email"
              name="usersEmail"
              id="usersEmail"
              placeholder="Enter Your Email id"
              className="border border-black rounded-lg block h-12 w-64 p-1 m-4 required"
            />
            <input
              type="text"
              name="mobileNo"
              placeholder="Enter your mobile no "
              className="border border-black rounded-lg block h-12 w-64 p-1 m-4 required"
            />
            <input
              type="submit"
              value="Enter"
              className="border border-black rounded-lg block px-5 py-2 "
            />
          </form>
          <h2 className="text-center">Remember password? <a href="/login" className="text-red-400">Login to continue</a></h2>
          <h2 className="text-center">New here!<a href="/signUp" className="text-red-400">Create an account</a></h2>
        </div>
      </div>
        </>
    )
}
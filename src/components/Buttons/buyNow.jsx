export default function BuyNowBtn(id) {
  const buyNow = async (id) => {
    if (localStorage.getItem("token")) {
      console.log(id.id);
    } else {
      alert("Login to Purchase to Your cart");
    }
  };
  return (
    <>
      <button
        className="w-fit h-10 rounded-md px-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-bold border"
        onClick={() => buyNow(id)}
      >
        Buy Now
      </button>
    </>
  );
}

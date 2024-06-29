export default function AddToCart(id){
    const addToCart = async (id) => {
        alert("Adding Items to Your Cart")
        if (localStorage.getItem("token")) {
          const token=localStorage.getItem("token")
          const idObj={id:id,token:token}
          try {
            const addToCartRes = await fetch(
              "http://localhost:8000/user/addToCart",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body:JSON.stringify(idObj)
              }
            );
          } catch (error) {
            console.log("Error occur while adding items to the cart");
          }
        } else {
          alert("Login to Add items to Your cart");
        }
      };
    return(
        <>
        <button
                    className="w-fit h-10 border-2 border-purple-500 rounded-lg p-2"
                    onClick={() => addToCart(id)}
                  >
                    Add to Cart
                  </button>
        </>
    )
}
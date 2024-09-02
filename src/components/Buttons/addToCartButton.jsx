export default function AddToCart(id){
    const addToCart = async (id) => {
        alert("Adding Items to Your Cart")
          
          try {
            await fetch(
              `http://localhost:8000/user/addToCart`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials:"include",
                body:JSON.stringify(id)
              }
            );
          } catch (error) {
            console.log("Error occur while adding items to the cart");
          }
      };
    return(
        <>
        <button
                    className="w-fit h-10 border-2 text-nowrap border-purple-500 rounded-lg p-2"
                    onClick={() => addToCart(id)}
                  >
                    Add to Cart
                  </button>
        </>
    )
}
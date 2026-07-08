import React from "react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";

function Cards({ item }) {
  const { addToCart, isInCart } = useCart();
  const [authUser] = useAuth();

  const inCart = isInCart(item._id);

  const handleBuyNow = async () => {
    if (!authUser) {
      toast.error("Please login to add courses to your cart");
      document.getElementById("my_modal_3")?.showModal();
      return;
    }

    if (inCart) {
      toast("This course is already in your cart", { icon: "🛒" });
      return;
    }

    try {
      await addToCart(item);
      toast.success(`${item.name} added to cart`);
    } catch (error) {
      toast.error("Couldn't add to cart, please try again");
    }
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt={item.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between items-center">
              <div className="badge badge-outline">
                {Number(item.price) === 0 ? "Free" : `$${item.price}`}
              </div>
              <button
                onClick={handleBuyNow}
                className={`cursor-pointer px-3 py-1 rounded-full border-[2px] duration-200 ${
                  inCart
                    ? "bg-pink-500 text-white"
                    : "hover:bg-pink-500 hover:text-white"
                }`}
              >
                {inCart ? "In Cart ✓" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;

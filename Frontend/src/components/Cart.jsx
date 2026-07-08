import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartProvider";
import { useEnroll } from "../context/EnrollProvider";

function Cart() {
  const { cart, removeFromCart, cartTotal, loading } = useCart();
  const { checkout } = useEnroll();
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  const handleRemove = async (courseId) => {
    try {
      await removeFromCart(courseId);
      toast("Removed from cart", { icon: "🗑️" });
    } catch {
      toast.error("Couldn't remove item, please try again");
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      setCheckingOut(true);
      await checkout();
      toast.success("Enrollment successful! Check the Training section.");
      navigate("/training");
    } catch (error) {
      toast.error("Checkout failed, please try again");
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-28 min-h-screen">
        <h1 className="text-2xl md:text-4xl text-center">
          Your <span className="text-pink-500">Cart</span>
        </h1>

        {loading ? (
          <p className="text-center mt-12">Loading your cart...</p>
        ) : cart.length === 0 ? (
          <div className="text-center mt-12">
            <p>Your cart is empty.</p>
            <Link to="/course">
              <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                Browse Courses
              </button>
            </Link>
          </div>
        ) : (
          <div className="mt-12 max-w-2xl mx-auto">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b py-4 gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm opacity-70">{item.title}</p>
                </div>
                <div className="font-semibold">
                  {Number(item.price) === 0 ? "Free" : `$${item.price}`}
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="px-3 py-1 rounded-full border-[2px] hover:bg-red-500 hover:text-white duration-200"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex items-center justify-between mt-8">
              <h2 className="text-xl font-semibold">
                Total: ${cartTotal.toFixed(2)}
              </h2>
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 disabled:opacity-60"
              >
                {checkingOut ? "Processing..." : "Checkout & Enroll"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;

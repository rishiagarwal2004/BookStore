import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";

export const CartContext = createContext();

const API = "http://localhost:4001";

export default function CartProvider({ children }) {
  const [authUser] = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = authUser?._id;

  // Load this user's cart from the backend whenever they log in/out
  const refreshCart = async () => {
    if (!userId) {
      setCart([]);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`${API}/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.log("Error fetching cart: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const addToCart = async (item) => {
    if (!userId) return;
    try {
      await axios.post(`${API}/cart`, { userId, courseId: item._id });
      setCart((prev) =>
        prev.find((c) => c._id === item._id) ? prev : [...prev, item]
      );
    } catch (error) {
      console.log("Error adding to cart: ", error);
      throw error;
    }
  };

  const removeFromCart = async (courseId) => {
    if (!userId) return;
    try {
      await axios.delete(`${API}/cart/${userId}/${courseId}`);
      setCart((prev) => prev.filter((c) => c._id !== courseId));
    } catch (error) {
      console.log("Error removing from cart: ", error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    try {
      await axios.delete(`${API}/cart/${userId}`);
      setCart([]);
    } catch (error) {
      console.log("Error clearing cart: ", error);
      throw error;
    }
  };

  const isInCart = (id) => cart.some((c) => c._id === id);

  const cartTotal = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        refreshCart,
        isInCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

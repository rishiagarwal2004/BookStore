import Cart from "../model/cart.model.js";

// GET /cart/:userId  -> list of { _id (cart row id), course: {...book fields} }
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.find({ userId }).populate("courseId");

    const formatted = cartItems
      .filter((item) => item.courseId) // guard against deleted courses
      .map((item) => ({
        cartId: item._id,
        ...item.courseId.toObject(),
      }));

    res.status(200).json(formatted);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /cart  -> body: { userId, courseId }
export const addToCart = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required" });
    }

    // findOneAndUpdate with upsert avoids duplicate-key errors if it's already there
    const cartItem = await Cart.findOneAndUpdate(
      { userId, courseId },
      { userId, courseId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ message: "Added to cart", cartItem });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE /cart/:userId/:courseId
export const removeFromCart = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    await Cart.findOneAndDelete({ userId, courseId });

    res.status(200).json({ message: "Removed from cart" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE /cart/:userId  -> clears the whole cart (used after checkout, or standalone)
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    await Cart.deleteMany({ userId });

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

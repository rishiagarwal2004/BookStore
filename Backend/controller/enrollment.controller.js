import Enrollment from "../model/enrollment.model.js";
import Cart from "../model/cart.model.js";

// GET /enrollment/:userId -> list of { _id, courseId, progress, ...course fields }
export const getEnrollments = async (req, res) => {
  try {
    const { userId } = req.params;

    const enrollments = await Enrollment.find({ userId }).populate("courseId");

    const formatted = enrollments
      .filter((item) => item.courseId)
      .map((item) => ({
        enrollmentId: item._id,
        progress: item.progress,
        enrolledAt: item.enrolledAt,
        ...item.courseId.toObject(),
      }));

    res.status(200).json(formatted);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /enrollment/checkout -> body: { userId }
// Moves every course currently in the user's cart into their enrollments, then empties the cart.
export const checkout = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const cartItems = await Cart.find({ userId });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const operations = cartItems.map((item) => ({
      updateOne: {
        filter: { userId, courseId: item.courseId },
        update: { $setOnInsert: { userId, courseId: item.courseId, progress: 0 } },
        upsert: true,
      },
    }));

    await Enrollment.bulkWrite(operations);
    await Cart.deleteMany({ userId });

    const enrollments = await Enrollment.find({ userId }).populate("courseId");
    const formatted = enrollments
      .filter((item) => item.courseId)
      .map((item) => ({
        enrollmentId: item._id,
        progress: item.progress,
        enrolledAt: item.enrolledAt,
        ...item.courseId.toObject(),
      }));

    res.status(200).json({ message: "Enrollment successful", enrollments: formatted });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PATCH /enrollment/:userId/:courseId -> body: { progress }
export const updateProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const { progress } = req.body;

    const updated = await Enrollment.findOneAndUpdate(
      { userId, courseId },
      { progress },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json({ message: "Progress updated", enrollment: updated });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

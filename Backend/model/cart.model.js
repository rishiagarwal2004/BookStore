import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true }
);

// A user can only have one entry per course in their cart
cartSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model("Cart", cartSchema);

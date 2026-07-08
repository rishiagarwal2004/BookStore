import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import contactRoute from "./route/contact.route.js";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cartRoute from "./route/cart.route.js";
import enrollmentRoute from "./route/enrollment.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/contact", contactRoute);

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI);
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/enrollment", enrollmentRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
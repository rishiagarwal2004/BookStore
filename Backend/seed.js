import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

mongoose
  .connect(process.env.MongoDBURI)
  .then(async () => {
    console.log("Connected to MongoDB");

    await Book.deleteMany({});

    await Book.insertMany([
      {
        name: "React JS",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        title: "Complete React JS Course",
      },
      {
        name: "Node.js",
        price: 499,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        title: "Node.js Masterclass",
      },
      {
        name: "MongoDB",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        title: "MongoDB Beginner Course",
      },
      {
        name: "Express.js",
        price: 399,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        title: "Express API Development",
      },
      {
        name: "JavaScript",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        title: "Modern JavaScript",
      },
      {
        name: "HTML & CSS",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        title: "HTML & CSS Mastery",
      },
      {
        name: "Python",
        price: 599,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
        title: "Python Programming",
      },
      {
        name: "Java",
        price: 699,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        title: "Core Java",
      },
      {
        name: "C++",
        price: 0,
        category: "Free",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        title: "C++ Fundamentals",
      },
      {
        name: "Data Structures",
        price: 799,
        category: "Paid",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        title: "DSA Bootcamp",
      },
    ]);

    console.log("Books Inserted Successfully ✅");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
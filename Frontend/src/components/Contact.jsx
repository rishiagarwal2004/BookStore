import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:4001/contact",
        data
      );

      if (res.status === 201) {
        toast.success("Message Sent Successfully!");
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-screen-md mx-auto mt-20 p-6 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Contact Us
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border p-2 rounded"
            {...register("name", { required: true })}
          />

          {errors.name && (
            <span className="text-red-500">
              Name is required
            </span>
          )}
        </div>

        <div className="mb-4">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded"
            {...register("email", { required: true })}
          />

          {errors.email && (
            <span className="text-red-500">
              Email is required
            </span>
          )}
        </div>

        <div className="mb-4">
          <label>Message</label>

          <textarea
            rows="5"
            placeholder="Enter your message"
            className="w-full border p-2 rounded"
            {...register("message", { required: true })}
          />

          {errors.message && (
            <span className="text-red-500">
              Message is required
            </span>
          )}
        </div>

        <button
          className="bg-pink-500 hover:bg-pink-700 text-white px-5 py-2 rounded"
        >
          Send Message
        </button>

      </form>
    </div>
  );
}

export default Contact;
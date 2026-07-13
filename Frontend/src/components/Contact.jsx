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
      `${import.meta.env.VITE_API_URL}/contact`,
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
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-slate-900 via-[#111827] to-slate-900">
      <div className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-md border border-slate-700 shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">

        {/* Left Section */}
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-5">
            Contact Us
          </h1>

          <p className="text-gray-100 leading-7 mb-8">
            Have questions about books, orders, or recommendations?
            We'd love to hear from you. Send us a message and our
            team will get back to you as soon as possible.
          </p>

          <div className="space-y-4 text-lg">
            <p>📧www.rishiagarwalmathmatician@gmail.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 Lucknow, Uttar Pradesh, India</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-100 mb-8">
            Send a Message & just let us know 
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label className="block mb-2 text-gray-300 font-medium">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                {...register("name", { required: true })}
              />

              {errors.name && (
                <span className="text-red-400 text-sm">
                  Name is required
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-gray-300 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                {...register("email", { required: true })}
              />

              {errors.email && (
                <span className="text-red-400 text-sm">
                  Email is required
                </span>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 text-gray-300 font-medium">
                Message
              </label>

              <textarea
                rows="5"
                placeholder="Enter your message"
                className="w-full bg-slate-800 border border-slate-600 text-white placeholder:text-gray-400 p-3 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                {...register("message", { required: true })}
              />

              {errors.message && (
                <span className="text-red-400 text-sm">
                  Message is required
                </span>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-lg hover:shadow-pink-500/20"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;

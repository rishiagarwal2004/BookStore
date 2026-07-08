import React from "react";

function About() {
  const features = [
    {
      icon: "📚",
      title: "Huge Collection",
      desc: "Explore a wide range of books and educational materials from different categories.",
    },
    {
      icon: "🎓",
      title: "Online Courses",
      desc: "Learn new skills through training programs and interactive courses.",
    },
    {
      icon: "🛒",
      title: "Easy Shopping",
      desc: "Add books to your cart and enjoy a smooth shopping experience.",
    },
  ];

  return (
    <div className="min-h-screen dark:bg-slate-900 dark:text-white pt-24 pb-16">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">

        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-pink-500">BookStore</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your one-stop destination for books, courses, and learning
            resources. We aim to make education simple, affordable, and
            accessible to everyone.
          </p>
        </div>
        <img
  src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png"
  className="w-48 mx-auto mt-8"
/>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-base-200 dark:bg-slate-800 p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 duration-300 text-center"
            >
              <div className="text-5xl mb-4">{item.icon}</div>

              <h2 className="text-2xl font-bold mb-3">
                {item.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-pink-500 text-white rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-4xl font-bold">1000+</h2>
            <p className="mt-2">Books Available</p>
          </div>

          <div className="bg-indigo-500 text-white rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-4xl font-bold">500+</h2>
            <p className="mt-2">Happy Learners</p>
          </div>

          <div className="bg-green-500 text-white rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-4xl font-bold">50+</h2>
            <p className="mt-2">Training Programs</p>
          </div>
        </div>

        {/* Mission */}
        <div className="mt-20 bg-base-200 dark:bg-slate-800 p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-4xl font-bold mb-6">
            Our Mission
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-8">
            We believe that learning should be accessible to everyone.
            Our platform combines books, courses, and training resources
            in one place to help students and professionals achieve their
            goals and continuously grow their knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
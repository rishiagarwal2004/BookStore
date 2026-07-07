import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [otpSent, setOtpSent] = useState(false);
  const sendOtp = async () => {
  const email = document.getElementById("email").value;

  if (!email) {
    toast.error("Enter Email First");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:4001/user/send-otp",
      { email }
    );

    toast.success(res.data.message);
    setOtpSent(true);

  } catch (err) {

    toast.error(err.response?.data?.message || "Failed");

  }
};

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      otp:data.otp
    };
    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className=" w-[600px] ">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
<div className="flex gap-2">
  <input
    id="email"
    type="email"
    placeholder="Enter your email"
    className="w-80 px-3 py-1 border rounded-md outline-none"
    {...register("email", { required: true })}
  />

  <button
    type="button"
    onClick={sendOtp}
    className="bg-blue-500 text-white px-3 rounded"
  >
    Send OTP
  </button>
</div>
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Password */}
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your password"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* OTP */}
{otpSent && (
  <div className="mt-4 space-y-2">
    <span>Enter OTP</span>
    <br />

    <input
      type="text"
      placeholder="Enter 6 digit OTP"
      className="w-80 px-3 py-1 border rounded-md outline-none"
      {...register("otp", { required: true })}
    />

    <br />

    {errors.otp && (
      <span className="text-sm text-red-500">
        OTP is required
      </span>
    )}
  </div>
)}
              {/* Button */}
              <div className="flex justify-around mt-4">
<button
  disabled={!otpSent}
  className={`rounded-md px-3 py-1 text-white ${
    otpSent
      ? "bg-pink-500 hover:bg-pink-700"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  Signup
</button>
                <p className="text-xl">
                  Have account?{" "}
                  <button
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>{" "}
                  <Login />
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

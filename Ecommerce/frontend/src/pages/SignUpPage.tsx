import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setIsSuccess(false);
      setMessage("Please fill in all required fields.");
      return;
    }

    axios
      .post("http://localhost:5000/user/signup", { name, email, password })
      .then((result) => {
        setIsSuccess(true);
        setMessage("");
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err.response?.data || "Error occurred");
        setIsSuccess(false);
        setMessage(
          err.response?.data || "An error occurred. Please try again."
        );
      });
  };
  return (
    <div className="mt-10 w-[90%] m-auto max-w-[1200px]">
      <div className="border-2 border-gray-200 shadow-md p-5 rounded-lg max-w-[400px] m-auto ">
        <div className="mb-12 ">
          <h1 className="text-2xl text-redAccent font-semibold">
            Create an Account
          </h1>
          <p className="mt-3 text-md">Enter your details below</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter your name"
              autoComplete="off"
              name="email"
              className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter your email"
              autoComplete="off"
              name="email"
              className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px]"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-10">
            <input
              type="Password"
              placeholder="Enter your password"
              autoComplete="off"
              name="password"
              className="border-b-2  w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isSuccess && (
            <div className="bg-[#FFDCE0] border-2 border-red-800 rounded-sm p-1">
              <p className="text-red-800 text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            className="mt-6 bg-redAccent text-white flex items-center justify-center h-12 rounded-sm w-[100%]"
          >
            Create Account
          </button>
        </form>
        <div className="mt-7 flex items-center justify-between">
          <p className="text-gray-600 text-md">Already have an account?</p>
          <Link to="/signin">
            <h1 className="underline">Sign in</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

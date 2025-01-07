import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useUserStore } from "../../store/product";

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const { setCurrentUser } = useUserStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setIsSuccess(false);
      setMessage("Please fill in all required fields.");
      return;
    }

    axios
      .post("http://localhost:5000/user/signin", { email, password })
      .then((result) => {
        if (result.data.success) {
          setIsSuccess(true);
          localStorage.setItem("token", result.data.user);

          const decodedToken = jwtDecode(result.data.user);
          console.log("DECODED TOKEN: ", decodedToken);
          setCurrentUser(decodedToken);
          console.log("Decoded User Info: ", decodedToken);

          alert("Logged in successfully");
          navigate("/");
        } else {
          setIsSuccess(false);
          setMessage("Unexpected response from the server.");
        }
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
      <div className="border-2 border-gray-200 shadow-md p-5 rounded-lg max-w-[400px] m-auto">
        <div className="mb-12">
          <h1 className="text-2xl text-redAccent font-semibold">
            Sign In to Exclusive
          </h1>
          <p className="mt-3 text-md">Enter your details below</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter your email"
              autoComplete="off"
              name="email"
              className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-10">
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="off"
              name="password"
              className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px]"
              value={password}
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
            Log In
          </button>
        </form>
        <div className="mt-7 flex items-center justify-between">
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/signup">
            <h1 className="underline">Sign up</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

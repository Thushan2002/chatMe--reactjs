import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const navigate = useNavigate();

  const { authUser, loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      if (authUser) {
        navigate("/");
        return;
      }
      return;
    }
    await loginUser(currentState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
    // If login/signup is successful, redirect to home
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex flex-col sm:flex-row items-center gap-10 justify-center p-4">
      {/* Left - Branding */}
      <div className="mb-10 sm:mb-0 text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">
          Chat<span className="text-primary-light">Me</span>
        </h1>
        <p className="text-gray-400 mt-2">Connect instantly with people!</p>
      </div>

      {/* Right - Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-gray-500 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-5">
        <h2 className="text-xl font-semibold text-center text-indigo-300">
          {currentState === "Sign Up" ? "Sign Up" : "Log In"}
        </h2>

        {currentState === "Sign Up" && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="px-4 py-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        {currentState === "Sign Up" && (
          <textarea
            placeholder="Short Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="px-4 py-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        )}

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 transition text-white py-2 rounded font-semibold">
          {currentState === "Sign Up" ? "Create Account" : "Log In"}
        </button>

        <p className="text-center text-sm">
          {currentState === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Log In")}
                className="text-indigo-300 cursor-pointer hover:underline">
                Log In
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setCurrentState("Sign Up")}
                className="text-indigo-300 cursor-pointer hover:underline">
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

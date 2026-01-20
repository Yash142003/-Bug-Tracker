import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", { email, password });

      // backend returns token
      localStorage.setItem("token", data.token);

      toast.success("Login successful!");
      navigate("/user/dashboard");
    } catch (err) {
      // Axios errors
      const status = err?.response?.status;

      if (status === 401) {
        toast.info("Wrong Credentials!");
      } else {
        toast.error("Server Side Error!");
        setError(err?.response?.data?.message || "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login to Bug Dector App" subtitle="Manage your bugs like Jira">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {loading && <div className="text-center mb-4 text-gray-600">Logging in...</div>}

      <form onSubmit={handleEmailPasswordSignIn}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-center mt-4 text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline font-bold">
          Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;

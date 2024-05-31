"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SignUp = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const username = e.target[1].value;
    const password = e.target[2].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");

      return;
    }

    if (!password || password.length < 6) {
      setError("Password is too short");
      return;
    }

    if (!username || username.length < 6) {
      setError("Username is too short");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 300) {
        setError("Username already in use");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return (
      <div className="h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center text-white font-semibold mb-8">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Username"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>
            <p className="text-red-500 text-[16px] mb-2 mt-2">
              {error && error}
            </p>
          </form>
          <div className="text-white text-sm py-2">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default SignUp;

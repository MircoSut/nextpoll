"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/"); // Redirect to the home page after sign out
  };

  return (
    <div>
      <ul className="flex justify-between p-2 items-center border-blue-700 border-b-2">
        <div>
          <li className="text-xl font-bold">Logo</li>
        </div>
        <div className="rounded-lg bg-green-400 px-2">
          <input
            className="bg-transparent w-4/5"
            type="text"
            placeholder="Search polls"
          />
          <button className="border-l-2 w-1/5">Go</button>
        </div>
        <div className="flex gap-2">
          <li className="mt-1">{session.user?.email || "User"}</li>
          <li>
            <button
              onClick={handleSignOut}
              className="p-2 px-3 -mt-1 bg-blue-800 rounded-full text-white"
            >
              Logout
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;

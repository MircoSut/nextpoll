"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const { data: session, sessionStatus } = useSession();

  const router = useRouter();

  const username = session?.user?.email.split("@")[0];

  const handleSignOut = async () => {
    await signOut();
    router.push("/"); // Redirect to the home page after sign out
  };

  if (sessionStatus === "loading") {
    return (
      <div className="h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <ul className="flex justify-between p-2 items-center border-blue-700 border-b-2">
        <div>
          <li className="text-xl font-bold">Logo</li>
        </div>
        <div className="flex flex-row rounded-full bg-gray-200 px-2 justify-center items-center">
          <input
            className="bg-transparent w-4/5"
            type="text"
            placeholder="Search polls"
          />
          <button className="text-xl font-bold flex border-l-2 border-gray-400 w-1/5 justify-center">
            <IoSearch />
          </button>
        </div>
        <div className="flex gap-2">
          <li className="mt-1">
            {username || session?.user?.email}
            {console.log(session?.user)}
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="text-xl p-2 px-3 bg-blue-800 rounded-full text-white hover:bg-blue-500 rotate-180"
            >
              <MdLogout />
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;

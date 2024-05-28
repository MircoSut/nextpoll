"use client";
import React from "react";
import Link from "next/link";

const NavbarHome = () => {
  return (
    <div className="bg-gray-100">
      <ul className="flex justify-between items-center p-2 border-blue-700 border-b-2">
        <div className="w-full items-center justify-between px-4 flex text-lg font-bold">
          <div>
            <li className="px-4 text-2xl font-bold">Logo</li>
          </div>
          <div className="flex flex-row justify-between gap-6 px-4">
            <Link href="/">
              <li className="hover:underline">Home</li>
            </Link>
          </div>
        </div>
        <div className="w-full items-center justify-end flex gap-4 px-2">
          <Link href={"/login"}>
            <li className="p-2 px-3 -mt-1 bg-blue-800 rounded-full text-white hover:bg-blue-500">
              Login
            </li>
          </Link>
          <Link href={"/signup"}>
            <li className="p-2 px-3 -mt-1 bg-blue-800 rounded-full text-white hover:bg-blue-500">
              Sign Up
            </li>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default NavbarHome;

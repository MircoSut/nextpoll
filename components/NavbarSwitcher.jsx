"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import NavbarHome from "@/components/NavbarHome";

const NavbarSwitcher = () => {
  const pathname = usePathname();

  console.log("Current pathname:", pathname);

  if (pathname === "/dashboard") {
    return <Navbar />;
  } else {
    return <NavbarHome />;
  }
};

export default NavbarSwitcher;

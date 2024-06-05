"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainPolls from "./MainPolls";
import MainCreate from "./MainCreate";
import MainMyPolls from "./MainMyPolls";

export default function DashboardLayout({ children }) {
  const [activeComponent, setActiveComponent] = useState("polls");

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderMainComponent = () => {
    switch (activeComponent) {
      case "polls":
        return <MainPolls />;
      case "create":
        return <MainCreate />;
      case "mypolls":
        return <MainMyPolls />;
      // Add more cases for additional components
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex min-h-screen bg-yellow-500 flex-row justify-start p-4">
      <Sidebar
        activeComponent={activeComponent}
        setActiveComponent={handleComponentChange}
      />
      <div className="w-3/4 bg-white border-gray-300 border-l-2 p-2">
        {renderMainComponent()}
      </div>
      {children}
    </div>
  );
}

import React from "react";
import { BsFire } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { BsCollection } from "react-icons/bs";

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  return (
    <div className="w-1/4 bg-white justify-start flex flex-col items-left pl-2">
      <div className="mt-4 mb-2">
        <button
          className={`flex items-center space-x-2 ${
            activeComponent === "polls"
              ? "text-red-500 underline"
              : "hover:text-red-500"
          }`}
          onClick={() => setActiveComponent("polls")}
        >
          <BsFire />
          <span className="text-lg">Suggested</span>
        </button>
      </div>
      <div className="mb-2">
        <button
          className={`flex items-center space-x-2 ${
            activeComponent === "create"
              ? "text-green-500 underline"
              : "hover:text-green-500"
          } `}
          onClick={() => setActiveComponent("create")}
        >
          <FaPlus />
          <span className="text-lg">Create</span>
        </button>
      </div>
      <div className="mb-2">
        <button
          className={`flex items-center space-x-2 ${
            activeComponent === "mypolls"
              ? "text-blue-500 underline"
              : "hover:text-blue-500"
          }`}
          onClick={() => setActiveComponent("mypolls")}
        >
          <BsCollection />
          <span className="text-lg">My polls</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

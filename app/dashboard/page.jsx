import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="w-full flex min-h-screen bg-yellow-500 flex-row justify-start p-4">
      <div className="w-2/6 bg-white justify-start flex flex-col items-left pl-2">
        <div>
          <Link href={"/"}>Suggested</Link>
        </div>
        <div>
          <Link href={"/"}>Create</Link>
        </div>
        {/* <div>
          <Link href={"/"}>Search</Link>
        </div> */}
      </div>
      <div className="w-4/6 bg-red-500">Main</div>
    </div>
  );
};

export default Dashboard;

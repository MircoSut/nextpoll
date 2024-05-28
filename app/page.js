"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === "loading") {
    return (
      <div className="h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Page</h1>
    </main>
  );
}

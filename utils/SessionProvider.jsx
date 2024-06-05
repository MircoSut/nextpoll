"use client";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
      setLoading(false);
    };
    fetchSession();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;

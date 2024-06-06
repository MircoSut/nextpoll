"use client";
import PollCard from "@/components/PollCard";
import React, { useEffect, useState } from "react";

const MainPolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch("/api/getPolls");
        if (!response.ok) {
          throw new Error("Failed to fetch polls");
        }
        const data = await response.json();
        setPolls(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-center">All Polls</h1>
      <div className="polls-list">
        {polls.map((poll) => (
          <div key={poll._id} className="poll">
            <PollCard poll={poll}></PollCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPolls;

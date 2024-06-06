import { connectToMongoDB } from "@/utils/db";
import Poll from "@/models/Poll";
import PollOptions from "@/models/PollOptions";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectToMongoDB();
  try {
    const polls = await Poll.find({});
    const pollsWithOptions = await Promise.all(
      polls.map(async (poll) => {
        const options = await PollOptions.find({ poll_id: poll._id });
        return { ...poll.toObject(), options };
      })
    );
    return NextResponse.json(pollsWithOptions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch polls" },
      { status: 500 }
    );
  }
};

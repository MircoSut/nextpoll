import { connectToMongoDB } from "@/utils/db";
import Poll from "@/models/Poll";
import PollOptions from "@/models/PollOptions";
import { NextResponse } from "next/server";
import User from "@/models/User";

export const GET = async (request) => {
  await connectToMongoDB();

  const sessionResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/session`,
    {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  const session = await sessionResponse.json();

  if (!session || !session.user) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const user_id = user._id;

  try {
    const polls = await Poll.find({ user_id });
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

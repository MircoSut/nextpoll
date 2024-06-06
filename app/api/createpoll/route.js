import Polls from "@/models/Poll";
import PollsOptions from "@/models/PollOptions";
import User from "@/models/User";
import { connectToMongoDB } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { title, description, question, option1, option2, option3, option4 } =
    await request.json();

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

  const newPoll = new Polls({
    user_id,
    title,
    description,
    question,
  });

  try {
    const savedPoll = await newPoll.save();

    const pollOptions = [
      new PollsOptions({ poll_id: savedPoll._id, option_text: option1 }),
      new PollsOptions({ poll_id: savedPoll._id, option_text: option2 }),
    ];

    if (option3) {
      pollOptions.push(
        new PollsOptions({ poll_id: savedPoll._id, option_text: option3 })
      );
    }
    if (option4) {
      pollOptions.push(
        new PollsOptions({ poll_id: savedPoll._id, option_text: option4 })
      );
    }

    await PollsOptions.insertMany(pollOptions);

    return new NextResponse("Poll created successfully", { status: 200 });
  } catch (error) {
    return new NextResponse(error.toString(), { status: 500 });
  }
};

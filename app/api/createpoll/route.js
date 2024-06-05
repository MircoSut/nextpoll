import Polls from "@/models/Polls";
import PollsOptions from "@/models/PollsOptions";
import PollsResponse from "@/models/PollsResponse";
import User from "@/models/User";
import { connectToMongoDB } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { title, description, question, option1, option2, option3, option4 } =
    await request.json();

  await connectToMongoDB();

  const newPoll = new Polls({
    user_id, //
    title,
    description,
    question,
  });

  const newPollOption = new PollsOptions({
    poll_id, //
    option_text: option1,
  });

  const newPollResponse = new PollsResponse({
    user_id, //
    poll_id, //
    option_id, //
  });

  try {
    await newUser.save();
    return new NextResponse("User is registered", { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};

import User from "@/models/User";
import { connectToMongoDB } from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { email, username, password } = await request.json();

  await connectToMongoDB();

  const existingUser = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }
  if (existingUsername) {
    return new NextResponse("Username is already in use", { status: 300 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    email,
    username,
    password: hashedPassword,
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

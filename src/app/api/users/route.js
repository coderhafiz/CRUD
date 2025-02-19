import connectMongoDB from "./../../../libs/mongodb.js";
import User from "./../../../models/user.js";
import { auth } from "./../../../auth.js";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await connectMongoDB();
  const users = await User.find({}, "name email role");

  return NextResponse.json(users);
}

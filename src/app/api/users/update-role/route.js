import connectMongoDB from "./../../../libs/mongodb.js";
import User from "./../../../models/user.js";
import { auth } from "./../../../auth.js";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { userId, newRole } = await req.json();

  await connectMongoDB();
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  user.role = newRole;
  await user.save();

  return NextResponse.json({ message: "Role updated successfully" });
}

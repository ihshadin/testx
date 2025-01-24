import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { UserModel } from "../../userModule/user.model";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email } = await request.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found!");
    }

    // Generate a 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    const resetCodeExpires = Date.now() + 60 * 60 * 1000; // 60 minutes validity

    // Update user with reset code and expiry
    user.resetCode = resetCode;
    user.resetCodeExpires = resetCodeExpires;
    const result = await user.save();

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message:
        "Reset code generated successfully. Send this code to the admin.",
      data: result, // This is for testing; remove in production!
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

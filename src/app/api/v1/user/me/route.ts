import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import ApiError from "@/errors/handleApiError";
import sendApiResponse from "@/shared/sendResponse";
import { handleError } from "@/shared/handleError";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "@/helpers/jwtHelpers";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const token = request.cookies.get("accessToken")?.value || "";

    // console.log("token from backend----> ", token);

    if (!token) {
      throw new ApiError(401, "You are Unauthorized");
    }

    const decoded = jwtHelpers.verifyToken(
      token as string,
      process.env.JWT_SECRET as Secret
    );

    const result = await UserModel.findOne({
      email: decoded.email,
      isDeleted: false,
    }).select("-password -isDeleted -__v");

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "User Retrieved Successfully!",
      data: result,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

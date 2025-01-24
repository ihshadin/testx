import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "@/helpers/jwtHelpers";
import { ApiError } from "next/dist/server/api-utils";
import { UserModel } from "../userModule/user.model";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";

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
    }).select("-password -__v");

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

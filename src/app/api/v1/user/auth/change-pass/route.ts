import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { jwtHelpers } from "@/helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import { ApiError } from "next/dist/server/api-utils";
import { UserModel } from "../../userModule/user.model";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { newPassword, oldPassword } = await request.json();

    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      throw new ApiError(401, "You are Unauthorized");
    }

    const decoded = jwtHelpers.verifyToken(
      token as string,
      process.env.JWT_SECRET as Secret
    );

    // find the user
    const user = await UserModel.findOne({ email: decoded.email }).select(
      "email -_id"
    );

    if (!user) {
      throw new ApiError(404, "User not found!!");
    }

    const isCorrectPassword = await bcrypt.compareSync(
      oldPassword,
      user.password
    );

    if (!isCorrectPassword) {
      throw new ApiError(401, "Old Password not matched!");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 11);

    await UserModel.findByIdAndUpdate(
      { _id: user._id },
      {
        password: newHashedPassword,
      }
    );

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Password Changed successfully!",
      data: null,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

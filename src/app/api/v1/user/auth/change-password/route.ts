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
    const { oldPassword, email, resetCode, newPassword } = await request.json();

    if (!newPassword) {
      throw new ApiError(400, "New password is required");
    }

    let user;

    if (resetCode) {
      user = await UserModel.findOne({
        email,
        resetCode,
        resetCodeExpires: { $gt: new Date() }, // Check if the code is still valid
      });

      if (!user) {
        throw new ApiError(400, "Invalid or expired reset code or email");
      }
    } else if (oldPassword) {
      const token = request.cookies.get("accessToken")?.value;

      if (!token) {
        throw new ApiError(401, "You are Unauthorized");
      }

      const decoded = jwtHelpers.verifyToken(
        token as string,
        process.env.JWT_SECRET as Secret
      );

      user = await UserModel.findOne({ email: decoded.email });

      if (!user) {
        throw new ApiError(404, "User not found");
      }

      const isCorrectPassword = bcrypt.compareSync(oldPassword, user.password);

      if (!isCorrectPassword) {
        throw new ApiError(401, "Old password does not match");
      }
    } else {
      throw new ApiError(
        400,
        "Either old password or reset code must be provided"
      );
    }

    // find the user
    // const user = await UserModel.findOne({ email: decoded.email }).select(
    //   "email -_id"
    // );
    // if (!user) {
    //   throw new ApiError(404, "User not found!!");
    // }
    // const isCorrectPassword = await bcrypt.compareSync(
    //   oldPassword,
    //   user.password
    // );
    // if (!isCorrectPassword) {
    //   throw new ApiError(401, "Old Password not matched!");
    // }
    // const newHashedPassword = await bcrypt.hash(newPassword, 11);
    // await UserModel.findByIdAndUpdate(
    //   { _id: user._id },
    //   {
    //     password: newHashedPassword,
    //   }
    // );

    const newHashedPassword = await bcrypt.hash(newPassword, 11);
    await UserModel.findByIdAndUpdate(user._id, {
      password: newHashedPassword,
      resetCode: null,
      resetCodeExpires: null,
    });

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

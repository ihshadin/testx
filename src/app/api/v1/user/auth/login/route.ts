import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { jwtHelpers } from "@/helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import { UserModel } from "../../userModule/user.model";
import { ApiError } from "next/dist/server/api-utils";
import { handleError } from "@/utils/errors/handleError";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    // find the user
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    // password check
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    const isRightPassword = password === user.password;

    if (!isCorrectPassword || isRightPassword) {
      throw new ApiError(409, "Password not matched!");
    }

    // generate token
    const accessToken = jwtHelpers.generateToken(
      {
        email,
        role: user.role,
        status: user.status,
      },
      process.env.JWT_SECRET as Secret,
      process.env.JWT_EXPIRES_IN as string
    );

    //TODO: hide this password
    // user.password = null;

    const response = NextResponse.json({
      message: "Login success!",
      success: true,
      data: {
        user,
        accessToken,
      },
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

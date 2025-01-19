import * as bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { UserModel } from "../../userModule/user.model";
import { userValidationSchema } from "../../userModule/user.validation";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const payload = await request.json();

    const isUserExist = await UserModel.findOne({ email: payload.email });

    if (isUserExist) {
      throw new Error("User already exist!");
    }

    payload.password = await bcrypt.hash(payload.password, 11);

    const validateUser = userValidationSchema.parse(payload);
    console.log(validateUser);
    const user = new UserModel(validateUser);
    const result = await user.save();

    //TODO: remove password from data

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Registration success!",
      data: result,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { ApiError } from "next/dist/server/api-utils";
import { UserModel } from "../userModule/user.model";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { userUpdateValidationSchema } from "../userModule/user.validation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await dbConnect();

    const result = await UserModel.findById(id).select("-password");

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Retrieved a User",
      data: result,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await dbConnect();

    const isExist = await UserModel.findOne({
      _id: id,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "User is not found!");
    }

    const payload = await req.json();

    const validateData = userUpdateValidationSchema.parse(payload);

    const result = await UserModel.findByIdAndUpdate(id, validateData, {
      new: true,
    });

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "User Updated Successfully!",
      data: result,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const adminVerify = verifyAdmin(req);

    if (!adminVerify) {
      throw new ApiError(401, "You are Unauthorized");
    }

    await dbConnect();

    const isExist = await UserModel.findOne({
      _id: id,
    }).select("isDeleted");

    if (!isExist) {
      throw new ApiError(404, "User not found!");
    }

    await UserModel.findByIdAndDelete(id);

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "User Deleted Successfully!",
      data: null,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ApiError from "@/errors/handleApiError";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { QuestionModel } from "../questionModule/question.model";
import { updateQuestionValidationSchema } from "../questionModule/question.validation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const id = params.id;

    const singleQuestion = await QuestionModel.findOne({
      _id: id,
    });

    if (!singleQuestion) {
      throw new ApiError(404, "Question not found!");
    }

    return sendApiResponse(NextResponse, {
      success: true,
      statusCode: 200,
      message: "Question retrieved successful!",
      data: singleQuestion,
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
    const adminVerify = verifyAdmin(req);

    if (!adminVerify) {
      throw new ApiError(401, "You are Unauthorized");
    }

    await dbConnect();

    const isExist = await QuestionModel.findOne({
      _id: id,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "Question is not found!");
    }

    const payload = await req.json();

    const validateData = updateQuestionValidationSchema.parse(payload);

    const result = await QuestionModel.findByIdAndUpdate(id, validateData, {
      new: true,
    });

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Question Updated Successfully!",
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

    const isExist = await QuestionModel.findOne({
      _id: id,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "Question not found!");
    }

    await QuestionModel.findByIdAndDelete(id);

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Question Deleted Successfully!",
      data: null,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

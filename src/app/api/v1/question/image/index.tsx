import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { QuestionModel } from "../questionModule/question.model";
import { updateQuestionValidationSchema } from "../questionModule/question.validation";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await dbConnect();

    const isExist = await QuestionModel.findOne({
      _id: id,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "Question not found!");
    }

    const body = await req.json();
    const { url } = body;

    if (!url) {
      throw new ApiError(400, "Image URL is required!");
    }

    const result = await QuestionModel.updateOne(
      { _id: id },
      { $push: { images: url } }
    );

    if (result.modifiedCount === 0) {
      throw new ApiError(404, "Image not found or already deleted!");
    }

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await dbConnect();

    const isExist = await QuestionModel.findOne({
      _id: id,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "Question not found!");
    }

    const body = await req.json();
    const { url } = body;

    if (!url) {
      throw new ApiError(400, "Image URL is required!");
    }

    const result = await QuestionModel.updateOne(
      { _id: id },
      { $pull: { images: url } }
    );

    if (result.modifiedCount === 0) {
      throw new ApiError(404, "Image not found or already deleted!");
    }

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

import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ApiError from "@/errors/handleApiError";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { QuestionModel } from "../../questionModule/question.model";
import { updateQuestionValidationSchema } from "../../questionModule/question.validation";

export async function PATCH(
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
      throw new ApiError(404, "Question is not found!");
    }

    const payload = await req.json();

    // Use $push to add the feedback to the feedbacks array
    const result = await QuestionModel.findByIdAndUpdate(
      id,
      { $push: { feedbacks: payload.feedbacks } },
      { new: true }
    );

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

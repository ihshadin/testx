import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ApiError from "@/errors/handleApiError";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { QuestionModel } from "../questionModule/question.model";
import { updateQuestionValidationSchema } from "../questionModule/question.validation";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Parse the request body
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      throw new ApiError(400, "Image URL is required!");
    }

    await dbConnect();

    // Check if the document exists
    const question = await QuestionModel.findById(id);

    if (!question) {
      throw new ApiError(404, "Question not found!");
    }

    // Update the images field
    const result = await QuestionModel.findByIdAndUpdate(
      id,
      {
        $push: { images: imageUrl },
      },
      { new: true, upsert: true } // 'upsert' ensures field creation if not existing
    );

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Image added successfully!",
      data: result,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

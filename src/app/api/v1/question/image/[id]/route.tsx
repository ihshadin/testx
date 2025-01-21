import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
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

    // Parse the request body
    const data = await req.json();
    // Validate input
    if (!Array.isArray(data)) {
      throw new ApiError(400, "Valid array of image URLs is required!");
    }

    // Check if the question exists
    const question = await QuestionModel.findById(id);
    if (!question) {
      throw new ApiError(404, "Question not found!");
    }

    // Update the 'images' field with the new URLs
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      id,
      { $addToSet: { images: { $each: data } } }, // Use $addToSet with $each to add multiple unique URLs
      { new: true } // Return the updated document
    );

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Image added successfully!",
      data: updatedQuestion,
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

    const data = await req.json();
    const { url } = data;
    if (!data) {
      throw new ApiError(400, "Image URL is required!");
    }

    const result = await QuestionModel.updateOne(
      { _id: id },
      { $pull: { images: url } }
    );
    // console.log("result------>", result);
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

import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ApiError from "@/errors/handleApiError";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { TopicModel } from "../topicModule/topic.model";
import { updateTopicValidationSchema } from "../topicModule/topic.validation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const id = params.id;

    const singleTopic = await TopicModel.findOne({
      _id: id,
    });

    if (!singleTopic) {
      throw new ApiError(404, "Topic not found!");
    }

    return sendApiResponse(NextResponse, {
      success: true,
      statusCode: 200,
      message: "Topic retrieved successful!",
      data: singleTopic,
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

    const isExist = await TopicModel.findOne({
      _id: id,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "Topic is not found!");
    }

    const payload = await req.json();

    const validateData = updateTopicValidationSchema.parse(payload);

    const result = await TopicModel.findByIdAndUpdate(id, validateData, {
      new: true,
    });

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Topic Updated Successfully!",
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

    const isExist = await TopicModel.findOne({
      _id: id,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "Topic not found!");
    }

    await TopicModel.findByIdAndDelete(id);

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Topic Deleted Successfully!",
      data: null,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

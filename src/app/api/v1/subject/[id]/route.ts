import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ApiError from "@/errors/handleApiError";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { SubjectModel } from "../subjectModule/subject.model";
import { updateSubjectValidationSchema } from "../subjectModule/subject.validation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const id = params.id;

    const singleSubject = await SubjectModel.findOne({
      _id: id,
    });

    if (!singleSubject) {
      throw new ApiError(404, "Subject not found!");
    }

    return sendApiResponse(NextResponse, {
      success: true,
      statusCode: 200,
      message: "Subject retrieved successful!",
      data: singleSubject,
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

    const isExist = await SubjectModel.findOne({
      _id: id,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "Subject is not found!");
    }

    const payload = await req.json();

    const validateData = updateSubjectValidationSchema.parse(payload);

    const result = await SubjectModel.findByIdAndUpdate(id, validateData, {
      new: true,
    });

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Subject Updated Successfully!",
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

    const isExist = await SubjectModel.findOne({
      _id: id,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "Subject not found!");
    }

    await SubjectModel.findByIdAndDelete(id);

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Subject Deleted Successfully!",
      data: null,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

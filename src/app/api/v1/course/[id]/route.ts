import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ApiError from "@/errors/handleApiError";
import { CourseModel } from "../courseModule/course.model";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { updateCourseValidationSchema } from "../courseModule/course.validation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const id = params.id;

    const singleCourse = await CourseModel.findOne({
      _id: id,
    });

    if (!singleCourse) {
      throw new ApiError(404, "Course not found!");
    }

    return sendApiResponse(NextResponse, {
      success: true,
      statusCode: 200,
      message: "Course retrieved successful!",
      data: singleCourse,
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

    const isExist = await CourseModel.findOne({
      _id: id,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "Course is not found!");
    }

    const payload = await req.json();

    const validateData = updateCourseValidationSchema.parse(payload);

    const result = await CourseModel.findByIdAndUpdate(id, validateData, {
      new: true,
    });

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Course Updated Successfully!",
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

    const isExist = await CourseModel.findOne({
      _id: id,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "Course not found!");
    }

    await CourseModel.findByIdAndDelete(id);

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Course Deleted Successfully!",
      data: null,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

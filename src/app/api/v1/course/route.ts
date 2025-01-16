import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { ApiError } from "next/dist/server/api-utils";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { CourseModel } from "./courseModule/course.model";
import { createCourseValidationSchema } from "./courseModule/course.validation";
import { queryHelpers } from "@/helpers/queryHelpers";
import QueryBuilder from "@/helpers/queryBuilder";
import { courseSearchableFields } from "./courseModule/course.constant";

export async function POST(req: NextRequest) {
  try {
    const adminVerify = verifyAdmin(req);

    if (!adminVerify) {
      throw new ApiError(401, "Unauthorized");
    }

    await dbConnect();
    const payload = await req.json();

    const isExistCourse = await CourseModel.findOne({
      name: payload?.name,
    });

    if (isExistCourse) {
      throw new ApiError(409, "Course is already exist");
    }

    const ValidateData = createCourseValidationSchema.parse(payload);

    const Course = new CourseModel(ValidateData);
    const createdCourse = await Course.save();

    return sendApiResponse(NextResponse, {
      statusCode: 201,
      success: true,
      message: "Course Created successfully!",
      data: createdCourse,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const allQueries = queryHelpers(req);

    const customerQuery = new QueryBuilder(CourseModel.find(), allQueries)
      .search(courseSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await customerQuery.modelQuery;
    const meta = await customerQuery.countTotal();

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Retrieve all customer successfully",
      meta,
      data: result,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

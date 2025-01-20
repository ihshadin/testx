import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { ApiError } from "next/dist/server/api-utils";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { queryHelpers } from "@/helpers/queryHelpers";
import QueryBuilder from "@/helpers/queryBuilder";
import { createSubjectValidationSchema } from "./subjectModule/subject.validation";
import { SubjectModel } from "./subjectModule/subject.model";
import { subjectSearchableFields } from "./subjectModule/subject.constant";
import { CourseModel } from "../course/courseModule/course.model";

export async function POST(req: NextRequest) {
  try {
    // Verify admin
    const adminVerify = verifyAdmin(req);
    if (!adminVerify) {
      throw new ApiError(401, "Unauthorized");
    }

    // Connect to the database
    await dbConnect();

    // Parse request payload
    const payload = await req.json();

    // Check if the subject already exists
    const isExistSubject = await SubjectModel.findOne({
      name: payload?.name,
      course: payload?.course,
    });
    if (isExistSubject) {
      throw new ApiError(409, "Subject already exists");
    }

    // Validate the payload structure
    const validatedData = createSubjectValidationSchema.parse(payload);

    // Create the new subject
    const subject = new SubjectModel(validatedData);
    const createdSubject = await subject.save();

    // Send a successful response
    return sendApiResponse(NextResponse, {
      statusCode: 201,
      success: true,
      message: "Subject created successfully!",
      data: createdSubject,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    await CourseModel;

    const allQueries = queryHelpers(req);

    const subjectQuery = new QueryBuilder(
      SubjectModel.find().populate("course"),
      allQueries
    )
      .search(subjectSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await subjectQuery.modelQuery;
    const meta = await subjectQuery.countTotal();

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Retrieve all subject successfully",
      meta,
      data: result,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

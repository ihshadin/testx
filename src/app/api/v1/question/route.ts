import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { ApiError } from "next/dist/server/api-utils";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { queryHelpers } from "@/helpers/queryHelpers";
import QueryBuilder from "@/helpers/queryBuilder";
import {
  createQuestionValidationSchema,
  updateQuestionValidationSchema,
} from "./questionModule/question.validation";
import { QuestionModel } from "./questionModule/question.model";
import { questionSearchableFields } from "./questionModule/question.constant";
import { SubjectModel } from "../subject/subjectModule/subject.model";
import { CourseModel } from "../course/courseModule/course.model";
import { TopicModel } from "../topic/topicModule/topic.model";
import { UserModel } from "../user/userModule/user.model";

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

    // Check if the question already exists
    const isExist = await QuestionModel.findOne({
      title: payload?.title,
    });
    if (isExist) {
      throw new ApiError(409, "Question already exists");
    }

    // Check if the question ID already exists
    // const isExistID = await QuestionModel.findOne({
    //   question_id: payload?.question_id,
    // });
    // if (isExistID) {
    //   throw new ApiError(409, "Question ID already exists");
    // }

    // Validate the payload structure
    const validatedData = createQuestionValidationSchema.parse(payload);

    // Create the new Question
    const Question = new QuestionModel(validatedData);
    const createdQuestion = await Question.save();

    // Send a successful response
    return sendApiResponse(NextResponse, {
      statusCode: 201,
      success: true,
      message: "Question created successfully!",
      data: createdQuestion,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    await CourseModel;
    await SubjectModel;
    await TopicModel;
    await UserModel;

    const allQueries = queryHelpers(req);

    const questionQuery = new QueryBuilder(
      QuestionModel.find()
        .populate("course")
        .populate("subject")
        .populate("topic")
        .populate("teacher"),
      allQueries
    )
      .search(questionSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const data = await questionQuery.modelQuery;
    const meta = await questionQuery.countTotal();

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Retrieve all question successfully",
      meta,
      data,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const payload = await req.json();

    const { questionIds, ...restData } = payload;

    if (
      !questionIds ||
      !Array.isArray(questionIds) ||
      questionIds.length === 0
    ) {
      throw new ApiError(400, "Question IDs are required");
    }

    const validateData = updateQuestionValidationSchema.parse(restData);

    const updated = await QuestionModel.updateMany(
      { _id: { $in: questionIds } }, // Match the question IDs
      {
        $set: restData,
      }
    );

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Question Updated Successfully!",
      data: updated,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

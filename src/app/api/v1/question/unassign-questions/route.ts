import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { ApiError } from "next/dist/server/api-utils";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { queryHelpers } from "@/helpers/queryHelpers";
import QueryBuilder from "@/helpers/queryBuilder";
import { SubjectModel } from "../../subject/subjectModule/subject.model";
import { QuestionModel } from "../questionModule/question.model";
import { CourseModel } from "../../course/courseModule/course.model";
import { TopicModel } from "../../topic/topicModule/topic.model";
import { updateQuestionValidationSchema } from "../questionModule/question.validation";

export async function GET(req: NextRequest) {
  try {
    // Verify admin
    const adminVerify = verifyAdmin(req);
    if (!adminVerify) {
      throw new ApiError(401, "Unauthorized");
    }

    await dbConnect();
    await CourseModel;
    await SubjectModel;
    await TopicModel;

    // Apply only the "unassigned" filter
    const unassignedQuestions = new QueryBuilder(
      QuestionModel.find({ status: "unassigned" })
        .populate("courses")
        .populate("subjects")
        .populate("topics"),
      queryHelpers(req)
    )
      .filter()
      .sort()
      .paginate()
      .fields();

    const data = await unassignedQuestions.modelQuery;
    const meta = await unassignedQuestions.countTotal();

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Retrieved unassigned questions successfully",
      meta,
      data,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const adminVerify = verifyAdmin(req);
    if (!adminVerify) {
      throw new ApiError(401, "You are Unauthorized");
    }

    await dbConnect();

    // Get the payload from the request
    const payload = await req.json();

    const { questionIds, teachers } = payload;

    if (
      !questionIds ||
      !Array.isArray(questionIds) ||
      questionIds.length === 0
    ) {
      throw new ApiError(400, "Question IDs are required");
    }

    const validateData = updateQuestionValidationSchema.parse(payload);

    if (!teachers || !Array.isArray(teachers) || teachers.length === 0) {
      throw new ApiError(400, "Teachers are required");
    }

    const questions = await QuestionModel.find({ _id: { $in: questionIds } });

    if (questions.length !== questionIds.length) {
      throw new ApiError(404, "Some of the questions were not found");
    }

    // Prepare the bulk update for the questions
    const bulkUpdateOps = questionIds.map((id) => ({
      updateOne: {
        filter: { _id: id },
        update: {
          $set: {
            teacher: teachers,
            status: "assigned",
            ...validateData,
          },
        },
      },
    }));

    // Execute the bulk update operation
    const result = await QuestionModel.bulkWrite(bulkUpdateOps);

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

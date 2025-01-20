import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { ApiError } from "next/dist/server/api-utils";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { QuestionModel } from "../question/questionModule/question.model";
import { UserModel } from "../user/userModule/user.model";
import { CourseModel } from "../course/courseModule/course.model";
import { SubjectModel } from "../subject/subjectModule/subject.model";
import { TopicModel } from "../topic/topicModule/topic.model";

export async function GET(req: NextRequest) {
  try {
    const adminVerify = verifyAdmin(req);

    if (!adminVerify) {
      throw new ApiError(401, "Unauthorized");
    }

    await dbConnect();

    const totalQuestions = await QuestionModel.countDocuments();
    const assignQuestions = await QuestionModel.countDocuments({
      status: "assigned",
    });
    const unassignQuestions = await QuestionModel.countDocuments({
      status: "unassigned",
    });
    const completedQuestion = await QuestionModel.countDocuments({
      status: "completed",
    });
    const totalTeachers = await UserModel.countDocuments({ role: "teacher" });
    const totalCoordinators = await UserModel.countDocuments({
      role: "coordinator",
    });
    const totalCourse = await CourseModel.countDocuments();
    const totalSubjects = await SubjectModel.countDocuments();
    const totalTopics = await TopicModel.countDocuments();

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Retrieve Meta Data",
      data: {
        totalQuestions,
        assignQuestions,
        unassignQuestions,
        completedQuestion,
        totalTeachers,
        totalCoordinators,
        totalCourse,
        totalSubjects,
        totalTopics,
      },
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

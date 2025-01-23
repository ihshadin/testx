import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { queryHelpers } from "@/helpers/queryHelpers";
import QueryBuilder from "@/helpers/queryBuilder";
import { CourseModel } from "../../course/courseModule/course.model";
import { SubjectModel } from "../../subject/subjectModule/subject.model";
import { TopicModel } from "../../topic/topicModule/topic.model";
import { UserModel } from "../../user/userModule/user.model";
import { QuestionModel } from "../questionModule/question.model";
import { questionSearchableFields } from "../questionModule/question.constant";
import { jwtHelpers } from "@/helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    await CourseModel;
    await SubjectModel;
    await TopicModel;
    await UserModel;

    const token = req.cookies.get("accessToken")?.value || "";
    const decoded: any = jwtHelpers.verifyToken(
      token as string,
      process.env.JWT_SECRET as Secret
    );

    const coordinator = await UserModel.findOne({
      email: decoded.email,
      role: "coordinator",
    });

    if (!coordinator) throw new Error("Coordinator not found");

    // Extract teacher IDs under the coordinator
    const teacherIds = coordinator.teachers.map((teacher: any) =>
      teacher.toString()
    );

    const allQueries = queryHelpers(req);

    const questionQuery = new QueryBuilder(
      QuestionModel.find({ teacher: { $in: teacherIds } })
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

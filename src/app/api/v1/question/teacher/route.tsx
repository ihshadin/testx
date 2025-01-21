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
    const decoded = jwtHelpers.verifyToken(
      token as string,
      process.env.JWT_SECRET as Secret
    );

    const teacher = await UserModel.findOne({
      email: decoded.email,
      role: "teacher",
    });

    if (!teacher) throw new Error("Coordinator not found");

    const allQueries = queryHelpers(req);

    const questionQuery = new QueryBuilder(
      QuestionModel.find({
        $or: [
          { teacher: teacher._id }, // Match if teacher's ID matches
          { owner: teacher._id }, // Match if owner's ID matches
        ],
        status: { $in: ["assigned", "reassigned"] }, // Match status of 'assigned' or 'reassigned'
      })
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

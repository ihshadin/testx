import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { ApiError } from "next/dist/server/api-utils";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { queryHelpers } from "@/helpers/queryHelpers";
import QueryBuilder from "@/helpers/queryBuilder";
import { CourseModel } from "../../course/courseModule/course.model";
import { SubjectModel } from "../../subject/subjectModule/subject.model";
import { UserModel } from "../userModule/user.model";
import { UserSearchableFields } from "../userModule/user.constant";

export async function GET(req: NextRequest) {
  try {
    const adminVerify = verifyAdmin(req);

    if (!adminVerify) {
      throw new ApiError(401, "Your are Unauthorized!");
    }

    await dbConnect();
    await CourseModel;
    await SubjectModel;

    const allQueries = queryHelpers(req);

    const userQuery = new QueryBuilder(
      UserModel.find({ role: { $in: ["teacher", "coordinator"] } })
        .select("-password")
        .populate("course")
        .populate("subject"),
      allQueries
    )
      .search(UserSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const data = await userQuery.modelQuery;
    const meta = await userQuery.countTotal();

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Retrieved all Users",
      meta,
      data,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "@/helpers/jwtHelpers";
import { ApiError } from "next/dist/server/api-utils";
import { UserModel } from "./userModule/user.model";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { TUser } from "@/types/user.type";
import { userUpdateValidationSchema } from "./userModule/user.validation";
import { queryHelpers } from "@/helpers/queryHelpers";
import QueryBuilder from "@/helpers/queryBuilder";
import { UserSearchableFields } from "./userModule/user.constant";
import { CourseModel } from "../course/courseModule/course.model";
import { SubjectModel } from "../subject/subjectModule/subject.model";
import { verifyTeacher } from "@/helpers/verifyTeacher";

export async function GET(req: NextRequest) {
  try {
    // const adminVerify = verifyAdmin(req);
    // const teacherVerify = verifyTeacher(req);

    // if (!adminVerify || !teacherVerify) {
    //   throw new ApiError(401, "Your are Unauthorized!");
    // }

    await dbConnect();
    await CourseModel;
    await SubjectModel;

    const allQueries = queryHelpers(req);

    const userQuery = new QueryBuilder(
      UserModel.find()
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

export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();

    const form = await request.formData();
    const file = form.get("file") as File;
    const textData = form.get("data") as string;
    const token = request.cookies.get("accessToken")?.value || "";
    const data = JSON.parse(textData);

    if (!token) {
      throw new ApiError(401, "You are Unauthorized");
    }

    const decoded = jwtHelpers.verifyToken(
      token as string,
      process.env.JWT_SECRET as Secret
    );

    const isUserExist = await UserModel.findOne({
      email: decoded.email,
    }).select("email");

    if (!isUserExist) {
      throw new ApiError(404, "Not Found User");
    }

    let payload: Partial<TUser> = {};

    if (textData) {
      payload = { ...data };
    }

    // TODO: Add upload image cloudinary if you need
    if (file && file.name) {
      // const photoUrlObj = await put("users/" + file.name, file, {
      //   access: "public",
      // });
      // payload.photo = photoUrlObj.url;
    }

    const validateData = userUpdateValidationSchema.parse(payload);

    const result = await UserModel.findByIdAndUpdate(
      {
        _id: isUserExist._id,
      },
      validateData,
      {
        new: true,
      }
    );

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "User Updated Successfully!",
      data: result,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

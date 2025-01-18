import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { ApiError } from "next/dist/server/api-utils";
import sendApiResponse from "@/utils/Response/sendResponse";
import { handleError } from "@/utils/errors/handleError";
import { queryHelpers } from "@/helpers/queryHelpers";
import QueryBuilder from "@/helpers/queryBuilder";
import { createTopicValidationSchema } from "./topicModule/topic.validation";
import { TopicModel } from "./topicModule/topic.model";
import { topicSearchableFields } from "./topicModule/topic.constant";
import { SubjectModel } from "../subject/subjectModule/subject.model";

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

    // Check if the topic already exists
    const isExistTopic = await TopicModel.findOne({ name: payload?.name });
    if (isExistTopic) {
      throw new ApiError(409, "Topic already exists");
    }

    // Validate the payload structure
    const validatedData = createTopicValidationSchema.parse(payload);

    // Create the new Topic
    const Topic = new TopicModel(validatedData);
    const createdTopic = await Topic.save();

    // Send a successful response
    return sendApiResponse(NextResponse, {
      statusCode: 201,
      success: true,
      message: "Topic created successfully!",
      data: createdTopic,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    await SubjectModel;

    const allQueries = queryHelpers(req);

    const topicQuery = new QueryBuilder(
      TopicModel.find().populate("subjects"),
      allQueries
    )
      .search(topicSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const data = await topicQuery.modelQuery;
    const meta = await topicQuery.countTotal();

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Retrieve all topic successfully",
      meta,
      data,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

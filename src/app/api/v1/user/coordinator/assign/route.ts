import ApiError from "@/errors/handleApiError";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import dbConnect from "@/lib/dbConnect";
import { handleError } from "@/utils/errors/handleError";
import sendApiResponse from "@/utils/Response/sendResponse";
import { NextRequest, NextResponse } from "next/server";
import { assignCoordinatorValidationSchema } from "../../userModule/user.validation";
import { UserModel } from "../../userModule/user.model";
import { startSession } from "mongoose";

export async function PATCH(req: NextRequest) {
  const session = await startSession(); // Start a Mongoose session
  session.startTransaction();

  try {
    // Verify admin
    const adminVerify = verifyAdmin(req);
    if (!adminVerify) {
      throw new ApiError(401, "Unauthorized");
    }

    await dbConnect();
    const payload = await req.json();

    const validateData = assignCoordinatorValidationSchema.parse(payload);
    const { teachers, coordinator } = validateData;

    // Step 1: Update the `coordinator` field for teachers
    const teacherUpdateResult = await UserModel.updateMany(
      { _id: { $in: teachers }, role: "teacher" }, // Match teachers by ID and role
      { $set: { coordinator } }, // Set the `coordinator` field
      { session }
    );

    // Step 2: Update the `teachers` field for the coordinator
    const coordinatorUpdateResult = await UserModel.updateOne(
      { _id: coordinator, role: "coordinator" }, // Match coordinator by ID and role
      { $addToSet: { teachers: { $each: teachers } } }, // Add teachers to the `teachers` array, avoiding duplicates
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Prepare the response
    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Users updated successfully!",
      data: {
        teachersUpdated: teacherUpdateResult.modifiedCount,
        coordinatorUpdated: coordinatorUpdateResult.modifiedCount,
      },
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error, NextResponse);
  }
}

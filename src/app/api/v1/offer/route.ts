import { verifyAdmin } from "@/helpers/verifyAdmin";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { createOfferValidation } from "@/validations/offer.validation";
import { OfferModel } from "@/models/offer.model";
import { StoreModel } from "../../../../models/store.model";
import sendApiResponse from "@/shared/sendResponse";
import { handleError } from "@/shared/handleError";
import QueryBuilder from "@/helpers/queryBuilder";
import { queryHelpers } from "@/helpers/queryHelpers";
import { offerSearchableFields } from "@/constants/offer.constant";
import { CategoryModel } from "@/models/category.model";
import ApiError from "@/errors/handleApiError";

export async function POST(request: NextRequest) {
  try {
    const adminVerify = verifyAdmin(request);

    if (!adminVerify) {
      throw new ApiError(401, "Your are Unauthorized!");
    }

    await dbConnect();

    const payload = await request.json();

    const validateData = createOfferValidation.parse(payload);

    const offer = new OfferModel(validateData);
    const createOffer = await offer.save();

    return sendApiResponse(NextResponse, {
      statusCode: 201,
      success: true,
      message: "Created offer successfully",
      data: createOffer,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  const allQueries = queryHelpers(req);

  try {
    const customerQuery = new QueryBuilder(
      OfferModel.find({ isDeleted: { $ne: true } }).populate({
        path: "store",
        // populate: {
        //   path: "categoryOne categoryTwo categoryThree",
        // },
      }),
      allQueries
    )
      .search(offerSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();


    const result = await customerQuery.modelQuery;

    const meta = await customerQuery.countTotal();

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Retrieve all offer successfully!",
      meta,
      data: result,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

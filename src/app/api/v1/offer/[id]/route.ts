import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import sendApiResponse from "@/shared/sendResponse";
import { handleError } from "@/shared/handleError";
import ApiError from "@/errors/handleApiError";
import { OfferModel } from "@/models/offer.model";
import { verifyAdmin } from "@/helpers/verifyAdmin";
import { TOffer } from "@/types/clientTypes/store.type";
import { UpdateOfferValidation } from "@/validations/offer.validation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const id = params.id;

    const singleOffer = await OfferModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!singleOffer) {
      throw new ApiError(404, "Offer not found!");
    }

    return sendApiResponse(NextResponse, {
      success: true,
      statusCode: 200,
      message: "Offer retrieved successful!",
      data: singleOffer,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const adminVerify = verifyAdmin(req);

    if (!adminVerify) {
      throw new ApiError(401, "You are Unauthorized");
    }

    await dbConnect();

    const isExist = await OfferModel.findOne({
      _id: id,
      isDeleted: false,
    }).select("_id");

    if (!isExist) {
      throw new ApiError(404, "Offer is not found!");
    }

    const payload = await req.json();

    const validateData = UpdateOfferValidation.parse(payload);

    const result = await OfferModel.findByIdAndUpdate(id, validateData, {
      new: true,
    });

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Offer Updated Successfully!",
      data: result,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const adminVerify = verifyAdmin(req);

    if (!adminVerify) {
      throw new ApiError(401, "You are Unauthorized");
    }

    await dbConnect();

    const isExist = await OfferModel.findOne({
      _id: id,
      isDeleted: false,
    }).select("_id isDeleted");

    if (!isExist) {
      throw new ApiError(404, "Offer not found!");
    }

    await OfferModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );

    return sendApiResponse(NextResponse, {
      statusCode: 200,
      success: true,
      message: "Offer Deleted Successfully!",
      data: null,
    });
  } catch (error: any) {
    return handleError(error, NextResponse);
  }
}

// import { NextResponse } from "next/server";

const sendApiResponse = <T>(
  response: any,
  jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
    data: T | null | undefined;
  }
) => {
  return response.json(
    {
      success: jsonData.success,
      message: jsonData.message,
      meta: jsonData.meta || null || undefined,
      data: jsonData.data || null || undefined,
    },
    {
      status: jsonData.statusCode,
    }
  );
};

export default sendApiResponse;

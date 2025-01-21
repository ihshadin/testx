import { NextRequest } from "next/server";
import { jwtHelpers } from "./jwtHelpers";

export const verifyTeacher = (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value || "";

  if (!accessToken) {
    return false;
  }

  if (accessToken) {
    const result = jwtHelpers.verifyToken(accessToken, process.env.JWT_SECRET!);

    if (result.role !== "teacher") {
      return false;
    }
  }

  return true;
};

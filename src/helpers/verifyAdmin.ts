import { NextRequest } from "next/server";
import { jwtHelpers } from "./jwtHelpers";

export const verifyAdmin = (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value || "";

  if (!accessToken) {
    return false;
  }

  if (accessToken) {
    const result = jwtHelpers.verifyToken(accessToken, process.env.JWT_SECRET!);

    if (result.role !== "admin" && result.role !== "superAdmin") {
      return false;
    }
  }

  return true;
};

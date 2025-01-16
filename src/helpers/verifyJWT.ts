import {NextRequest} from "next/server";
import {jwtHelpers} from "./jwtHelpers";

export const verifyJWT = (req: NextRequest) => {
  const authorizationHeader = req.headers.get("authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return false;
  }

  const jwt_token = authorizationHeader.split(" ")[1];

  if (!jwt_token) {
    return false;
  }

  return jwtHelpers.verifyToken(
      jwt_token,
      process.env.JWT_CUSTOMER_SECRET!
  );
};

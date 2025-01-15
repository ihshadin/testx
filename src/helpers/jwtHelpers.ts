import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

const decodedJWT = (token: string) => {
  return jwtDecode(token);
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
  decodedJWT,
};

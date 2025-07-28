import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "default-secret";

if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET is missing in environment variables.");
}

export function createJWT(payload: object) {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "7d" });
}

export function verifyJWT(token: string) {
  return jwt.verify(token, JWT_SECRET_KEY);
}

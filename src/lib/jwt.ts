import jwt from "jsonwebtoken";
import { UserPayload } from "@/types/auth";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signJWT(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyJWT(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch {
    return null;
  }
}

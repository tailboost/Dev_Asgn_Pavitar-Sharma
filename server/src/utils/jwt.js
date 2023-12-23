import jwt from "jsonwebtoken";

export const generateSignature = async (payload) => {
  const JWT_SECRET = process.env.SECRET_ACCESS_KEY;
  const payloadData = { id: payload._id };
  return jwt.sign(payloadData, JWT_SECRET, { expiresIn: "7d" });
};

import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(createHttpError(401, "No access token"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) return next(createHttpError(401, "No access token"));

  const decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY);

  if (!decoded) {
    return next(createHttpError(403, "Access token is invalid"));
  }

  req.user = decoded.id;
  next();
};

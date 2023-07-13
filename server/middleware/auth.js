import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

UnAuthenticatedError;
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  try {
    if (authHeader || authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (Date.now() >= payload.exp * 1000) {
        throw new UnAuthenticatedError("Authentication Invalid");
      }
      req.user = { userId: payload.userId };
      next();
    }
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;

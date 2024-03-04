import { RequestHandler, Request } from "express";
import jwt from "jsonwebtoken";
import { Env } from "../utils/envalid/envalid";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isAuthorized: RequestHandler = async (
  req: Request | any,
  res,
  next
) => {
  let token;

  token = req.cookies.jwt;

  try {
    if (token) {
      const decode: any = jwt.verify(token, Env.JWT_SECRET);

      req.user = await prisma.user.findUnique({ where: 
        {id: decode.userId}, });
      next();
    } else {
      return res.status(401).json({ msg: "token failed" });
    }
  } catch (error) {
    res.status(401).json({ msg: "there is no token, you are unauthorized"});
  }
 
};

export const isUserAdmin: RequestHandler = (req: any, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ msg: "not authorize as an admin" });
  }
};
export const isUserWriter: RequestHandler = (req: any, res, next) => {
  if (req.user && req.user.isWriter) {
    next();
  } else {
    return res.status(401).json({ msg: "not authorize as a writer" });
  }
};

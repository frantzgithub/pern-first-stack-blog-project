import { Response } from "express";
import jwt from "jsonwebtoken";
import { Env } from "../envalid/envalid";

export const generateToken = (res: Response, userId: string | number) => {
    const token = jwt.sign({ userId }, Env.JWT_SECRET, {expiresIn: "30d"});

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: Env.NODE_ENV != "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    return token;
}
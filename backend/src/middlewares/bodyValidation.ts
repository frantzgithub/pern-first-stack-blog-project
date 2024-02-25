import { RequestHandler } from "express";

export const isBodyValid: RequestHandler = (req, res, next) => {
    if (!req.body.username) {
        return res.status(404).json({msg: "missing username"});
    }

    if (!req.body.email) {
        return res.status(404).json({msg: "missing email"});
    }

    if (!req.body.password) {
        return res.status(404).json({msg: "missing password"});
    }

    next();
}
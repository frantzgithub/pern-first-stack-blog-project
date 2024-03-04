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

export const isBodyValidCategory: RequestHandler = (req, res, next) => {
    if(!req.body.category_name) {
        return res.status(400).json({msg: "you must provide a category"})
    } 
    next()
}

export const isBodyValidBlog: RequestHandler = (req, res, next) => {
    if(!req.body.title) {
        return res.status(200).json({msg: "title must provided"})
    }
    if(!req.body.desc) {
        return res.status(200).json({msg: "description must provided"})
    }
    next()
}
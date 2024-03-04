import { Request, RequestHandler, Response } from "express";
import { createBlogController, getAllBlogsController, getSingleBlogId } from "../controllers/blog/blogController";

export const getBlogs: RequestHandler = async (req, res) => {
    await getAllBlogsController(res);
}

export const getBlog: RequestHandler = async (req, res) => {
    const { id } = req.params
    await getSingleBlogId(res, id)
}
export const createBlogs = async (req: Request | any, res: Response) => {
    const { title, desc, image, category } = req.body;
    const userId = req.user.id;

    await createBlogController(req, res, title, desc, category, image, userId)
}
export const updateBlog: RequestHandler = async (req, res) => {
    const { id } = req.params
    res.send("update blog where id is " + id)
}
export const deleteBlog: RequestHandler = async (req, res) => {
    const { id } = req.params
    res.send("delete blog where id is " + id)
}

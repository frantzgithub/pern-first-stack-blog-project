import { Router } from "express"
import { isAuthorized, isUserWriter } from "../middlewares/authorization"
import { createBlogs, deleteBlog, getBlog, getBlogs, updateBlog } from "../handlers/blogHandler"
import { isBodyValidBlog } from "../middlewares/bodyValidation"
import { upload } from "../middlewares/multerMiddleware"

const blogRouter = Router()

blogRouter
    .route("/")
    .get(isAuthorized, getBlogs)
    .post(isAuthorized, isUserWriter, upload.single("image"), createBlogs)

blogRouter
    .route("/:id")
    .get(isAuthorized, getBlog)
    .put(isAuthorized, isUserWriter, updateBlog)
    .delete(isAuthorized, isUserWriter, deleteBlog)


export { blogRouter }
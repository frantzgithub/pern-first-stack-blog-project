import { RequestHandler } from "express";
import { createCategoryController, deleteCategoryController, getCategoriesController, updateCategoryController } from "../controllers/category/categoryController";

export const getCategories: RequestHandler = async (req, res) => {
    const { name } = req.query;
    name ? res.send("category where name is "+ name) : await getCategoriesController(res)
    
}
export const createCategory: RequestHandler = async (req, res) => {
    const {category_name} = req.body
    await createCategoryController(res, category_name)
}
export const updateCategory: RequestHandler = async (req, res) => {
    const { id } = req.params
    const {category_name} = req.body;
    await updateCategoryController(res, id, category_name)
}
export const deleteCategory: RequestHandler = async (req, res) => {
    const { id } = req.params
    await deleteCategoryController(res, id)
}
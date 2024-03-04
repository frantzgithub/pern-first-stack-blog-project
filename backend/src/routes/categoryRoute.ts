import { Router } from "express"
import { createCategory, deleteCategory, getCategories, updateCategory } from "../handlers/categoryHandler";
import { isAuthorized, isUserWriter } from "../middlewares/authorization";
import { isBodyValidCategory } from "../middlewares/bodyValidation";

const categoryRoutes = Router()

categoryRoutes
    .route('/')
    .get(isAuthorized, getCategories)
    .post(isAuthorized, isUserWriter, isBodyValidCategory, createCategory)


categoryRoutes
    .route('/:id')
    .put(isAuthorized, isUserWriter, updateCategory)
    .delete(isAuthorized, isUserWriter, deleteCategory)


export default categoryRoutes;
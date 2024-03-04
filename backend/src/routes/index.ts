import { Router } from "express";
import { userRoutes } from "./userRoute";
import categoryRoutes from "./categoryRoute";
import { blogRouter } from "./blogRoute";

const mainRoutes = Router();

mainRoutes.use('api/users', userRoutes);
mainRoutes.use('/api/categories', categoryRoutes)
mainRoutes.use('/api/blogs', blogRouter)
export { mainRoutes}
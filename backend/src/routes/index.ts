import { Router } from "express";
import { userRoutes } from "./userRoute";

const mainRoutes = Router();

mainRoutes.use('/api/users', userRoutes);

export { mainRoutes}
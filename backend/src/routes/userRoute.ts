import { Router } from "express";
import { 
    loginUserHandler,
    logoutUserHandler, 
    registerUserHandler,
    getAllUsers,
    getUserById,
    updateUserById,
    getCurrentUser,
    updateCurrentUser,
    deleteCurrentUser,
    deleteUserById,
} from "../handlers/userHandler";
import { isBodyValid } from "../middlewares/bodyValidation";
import { isAuthorized, isUserAdmin } from "../middlewares/authorization";

const userRoutes = Router();

userRoutes.route('/')
    .post(isBodyValid ,registerUserHandler)
    .get(isAuthorized, isUserAdmin, getAllUsers);
userRoutes.post('/login', loginUserHandler);
userRoutes.post('/logout', logoutUserHandler);

// profile routes

userRoutes.route('/profile')
    .get(isAuthorized, getCurrentUser)
    .put(isAuthorized, updateCurrentUser)
    .delete(isAuthorized, deleteCurrentUser);

// admin routes
userRoutes.route('/:userId')
    .get(isAuthorized, isUserAdmin, getUserById)
    .put(isAuthorized, isUserAdmin, updateUserById)
    .delete(isAuthorized, isUserAdmin, deleteUserById)


export { userRoutes}
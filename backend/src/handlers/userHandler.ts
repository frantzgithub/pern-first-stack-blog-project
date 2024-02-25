import { RequestHandler } from "express";
import { createUser, loginUserController } from "../controllers/users/userAuthController";

import {
    deleteUserByIdController,
    getUserByIdController,
    getUsersController,
    updateUserByIdController,
} from "../controllers/users/userAdminController"
import { deleteCurrentUserController, getCurrentUserController, updateCurrentUserController } from "../controllers/users/userProfileController";



export const registerUserHandler: RequestHandler = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await createUser(res, username, email, password);
    } catch (error) {
        res.status(500).json({msg: "internal error"})
    }
}

export const loginUserHandler: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        await loginUserController(res, email, password);
    } catch (error) {
        res.status(500).json({msg: "internal error"});
    }
}

export const logoutUserHandler: RequestHandler = async (req, res) => {
    res.cookie("jwt", '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({msg: "logout was successfully"});
}

export const getAllUsers: RequestHandler = async (req, res) => {
    try {
        await getUsersController(res);
        
    } catch (error) {
        res.status(400).json({msg: "can't find the users"});
    }
}

export const getUserById: RequestHandler = async (req: any, res) => {
    const { userId } = req.params;
    try {
        await getUserByIdController(res, userId)
    } catch (error) {
        res.status(500).json({msg: "internal error"});
    }
}

export const updateUserById: RequestHandler = async (req, res) => {
    const { userId } = req.params;
    try {
        await updateUserByIdController(req, res, userId);
    } catch (error) {
        res.status(500).json({msg: "internal error"});
    }
}

export const deleteUserById: RequestHandler = async (req, res) => {
    const { userId } = req.params;
    try {
        await deleteUserByIdController(res, userId);
    } catch (error) {
        res.status(500).json({msg: "internal error"});
    }
}

export const getCurrentUser: RequestHandler = async (req, res) => {
    try {
        await getCurrentUserController(req, res);
    } catch (error) {
        res.status(500).json({msg: "internal error"});
    }
}
export const updateCurrentUser: RequestHandler = async (req, res) => {
    try {
        await updateCurrentUserController(req, res);
    } catch (error) {
        res.status(500).json({msg: "internal error"});
    }
}
export const deleteCurrentUser: RequestHandler = async (req, res) => {
    try {
        await deleteCurrentUserController(req, res);
    } catch (error) {
        res.status(500).json({msg: "internal error"});
    }
}
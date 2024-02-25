import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getCurrentUserController = async (req: Request | any, res: Response) => {
    const user = await prisma.user.findUnique({where: {id: req.user.id}});
    if (user) {
        return res.status(200).json({id: user.id, username: user.username, email: user.email});
    }
    else {
        return res.status(404).json({msg: "user not found"});
    }
}

export const updateCurrentUserController = async (req: Request | any, res: Response) => {
    const user = await prisma.user.findUnique({where: {id: req.user.id}});
    if (user) {
        await prisma.user.updateMany({
         where: { id: user.id},
            data: {
                username: req.body.username || user.username,
                email: req.body.email || user.email
            }
    });
    return res.status(200).json({id: user.id, username: user.username, email: user.email})
    }
    else {
        return res.status(404).json({msg: "user not found"});
    }
}

export const deleteCurrentUserController = async (req: Request | any, res: Response) => {
    const user = await prisma.user.findUnique({where: {id: req.user.id}});
    if(user) {
        if(user.isAdmin) {
            return res.status(400).json({msg: "can't delete the user admin"});
        }
        else {
            await prisma.user.delete({
                where: {id: user.id}
            })
            res.status(204).json({msg: "user deleted"});
        }
    }
    else {
        return res.status(404).json({msg: "user not found"});
    }
}
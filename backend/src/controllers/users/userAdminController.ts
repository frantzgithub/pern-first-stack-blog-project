import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getUsersController = async (res: Response) => {
    const users: any = await prisma.user.findMany();
    res.status(200).json(users);
}

export const getUserByIdController = async (res: Response, id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    if(user){
        res.status(200).json({id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin, isWriter: user.isWriter, createdAt: user.createdAt});
    }
    else {
        return res.status(404).json({msg: "there is no user with this id"});
    }
}

export const updateUserByIdController = async (req: Request, res: Response, id: string) => {
    const user = await prisma.user.findUnique({where: {id}});
    if (user) {
       
        
        try {
            await prisma.user.updateMany({
                where: {id: user.id},
                data: {
                    username: user.username = req.body.username || user.username,
                    email: user.email = req.body.email || user.email,
                    isAdmin: user.isAdmin = req.body.isAdmin || user.isAdmin,
                    isWriter: user.isWriter = req.body.isWriter || user.isWriter
                }
            });

            res.status(200).json({id: user.id, usermane: user.username, email: user.email, isAdmin: user.isAdmin, isWriter: user.isWriter})
        } catch (error) {
            res.status(404).json({msg: 'there is a problem, please try again'})
        }
    }
    else {
        return res.status(404).json({msg: "user not found"})
    }
}

export const deleteUserByIdController = async (res: Response, id: string) => {
    const user = await prisma.user.findUnique({where: {id}});
    if (user) {
        if(user.isAdmin){
            return res.status(400).json({msg: "you can't delete the user admin"});
        }
        else {
            await prisma.user.delete({
                where: {id: user.id}
            })
            res.status(204).json({msg: "user was deleted successfully"});
        }
    }
    else {
        return res.status(404).json({msg: "user not found"})
    }
}
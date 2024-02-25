import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/token/generateToken";

const prisma = new PrismaClient();

export const createUser = async (res: Response, username: string, email: string, password: string) => {

    if(!validator.isEmail(email)) {
        return res.status(400).json({msg: "user invalid"});
    }
    if(!validator.isStrongPassword(password)) {
        return res.status(400).json({msg: "password invalid, please try again with a strong password"});
    }

    const exist = await prisma.user.findFirst({ where: {email} });

    if (exist) {
        return res.status(400).json({msg: "user already exist"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);;

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashPassword
        },
    })

    generateToken(res, newUser.id);
    res.status(201).json({id: newUser.id, username: newUser.username, email: newUser.email})

}



export const loginUserController = async (res: Response, email: string, password: string) => {
    const exist: any = await prisma.user.findFirst({ where: {email}});

    if (exist) {
        const match = await bcrypt.compare(password, exist.password);
        if(match) {
            generateToken(res, exist.id);
            res.status(200).json({id: exist.id, username: exist.username, email: exist.email, isAdmin: exist.isAdmin});
            return;
        }else{
            return res.status(400).json({msg: "token failed, please try again with the right credentials"});
        }
    }
    else {
        return res.status(404).json({msg: "user not found"});
    }
}

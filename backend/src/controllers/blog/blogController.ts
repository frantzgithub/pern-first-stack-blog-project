import { PrismaClient } from "@prisma/client";
import { upload } from "../../middlewares/multerMiddleware";
import { cloudinary } from "../../utils/cloudinary/cloudinary";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// export interface customTypeExpress extends Request {
//     user: {
//         id: string | undefined
//     } | undefined
// }

export const getAllBlogsController = async (res: Response) => {
  try {
    const blogs = await prisma.post.findMany();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ msg: "there is an error" });
  }
};

export const getSingleBlogId = async (res: Response, id: string) => {
    try {
        const blog = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                author: {
                    select: {
                        username: true,
                        email: true,
                    }
                },
                category: {
                    select: {
                        category_name: true,
                    }
                }
            }
        });
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({ msg: "there is an error" });
    }
}

export const createBlogController = async (
  req: Request | any,
  res: Response,
  title: string,
  desc: string,
  category: string,
  image: string,
  userId: string
) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const uploadToCloudinary = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "blog-image",
    });
    if (uploadToCloudinary) {
      console.log(uploadToCloudinary);
      const newBlog = await prisma.post.create({
        data: {
          title,
          desc,
          image: uploadToCloudinary.secure_url,
          categoryId: category,
          authorId: userId,
        },
      });
      res
        .status(201)
        .json({ msg: "post was created successfully", blog: newBlog });
    } else {
      res.status(400).json({ msg: "there is a problem with the image" });
    }
  } catch (error) {
    res.status(500).json({ msg: "there is an error" });
  }
};

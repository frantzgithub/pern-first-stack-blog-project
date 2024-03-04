import { PrismaClient } from "@prisma/client";
import { Response } from "express";

const prisma = new PrismaClient();

export const getCategoriesController = async (res: Response) => {
  const categories = await prisma.category.findMany();
  res.status(200).json(categories);
};

export const createCategoryController = async (
  res: Response,
  category_name: string
) => {
  const existCategory = await prisma.category.findFirst({
    where: { category_name },
  });
  if (existCategory) {
    return res.status(400).json({ msg: "category already exist" });
  } else {
    try {
      const newCategory = await prisma.category.create({
        data: {
          category_name,
        },
      });
      res.status(201).json(newCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "there is an error" });
    }
  }
};

export const updateCategoryController = async (
  res: Response,
  id: string,
  category_name: string
) => {
  const existCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (existCategory) {
    try {
      const newCategory = await prisma.category.update({
        where: { id },
        data: {
          category_name: category_name || existCategory.category_name,
        },
      });
      res
        .status(200)
        .json({
          msg: "category is updated successfully",
          category: newCategory,
        });
    } catch (error) {
      res.status(400).json({ msg: "there is an error" });
    }
  } else {
    return res.status(404).json({ msg: "category not found" });
  }
};

export const deleteCategoryController = async (res: Response, id: string) => {
  const existCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (existCategory) {
    try {
      await prisma.category.delete({
        where: { id },
      });
      res.status(204).json({ msg: "category removed" });
    } catch (error) {
      res.status(500).json({ msg: "there is an error" });
    }
  }
};

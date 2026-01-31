import { Request, Response } from "express";
import * as CategoryService from "./category.service";

// Create category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await CategoryService.createCategory(name);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Category already exists",
      });
    }

    res.status(500).json({ message: "Failed to create category" });
  }
};

// Get all categories
export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getAllCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};
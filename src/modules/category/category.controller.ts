import { Request, Response } from "express";
import * as CategoryService from "./category.service";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const result = await CategoryService.createCategory(name);

    res.status(201).json({
      success: true,
      message: "Category created",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error.message === "CATEGORY_ALREADY_EXISTS"
          ? "Category already exists"
          : "Failed to create category",
      error: error.message,
    });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.getAllCategories();

    return res.json({
      success: true,
      message: "Category fetched",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error.message === "CATEGORY_NOT_FOUND",
      error: error.message,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.updateCategory(
      req.params.id as string,
      req.body.name
    );

    res.json({
      success: true,
      message: "Category updated",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error.message === "CATEGORY_NOT_FOUND"
          ? "Category not found"
          : "Update failed",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.deleteCategory(req.params.id as StringIterator);

    res.json({
      success: true,
      message: "Category deleted",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error.message === "CATEGORY_HAS_MEALS"
          ? "Cannot delete category with meals"
          : "Delete failed",
      error: error.message,
    });
  }
};
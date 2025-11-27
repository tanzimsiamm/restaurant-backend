import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { ICategory } from "./category.interface";
import Category from "./category.model";

const createCategory = async (payload: ICategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategories = async (query: { isActive?: string }) => {
  const filter: { isActive?: boolean } = {};

  // Default to active categories only if not specified
  if (query.isActive === undefined) {
    filter.isActive = true;
  } else {
    filter.isActive = query.isActive === "true";
  }

  console.log('🔍 Category Query:', { query, filter });
  
  const result = await Category.find(filter).sort({ order: 1 });
  
  console.log('✅ Categories found:', result.length);
  
  return result;
};

const getCategoryById = async (id: string) => {
  const result = await Category.findById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Category not found");
  }

  return result;
};

const getCategoryBySlug = async (slug: string) => {
  const result = await Category.findOne({ slug });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Category not found");
  }

  return result;
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, "Category not found");
  }

  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteCategory = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, "Category not found");
  }

  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
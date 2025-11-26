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

  if (query.isActive) {
    filter.isActive = query.isActive === "true";
  }

  // Changed sorting from createdAt: -1 to order: 1 to match UI tab sequence
  const result = await Category.find(filter).sort({ order: 1 });
  return result;
};

const getCategoryById = async (id: string) => {
  const result = await Category.findById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Category not found");
  }

  return result;
};

// ... rest of the service files (getCategoryBySlug, updateCategory, deleteCategory) remain unchanged
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
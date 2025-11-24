import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IProduct } from './product.interface';
import Product from './product.model';
import Category from '../category/category.model';

interface QueryParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  isFeatured?: string;
  isActive?: string;
  search?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

const createProduct = async (payload: IProduct) => {
  // Check if category exists
  const categoryExists = await Category.findById(payload.category);
  if (!categoryExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query: QueryParams) => {
  const {
    category,
    minPrice,
    maxPrice,
    isFeatured,
    isActive,
    search,
    sort = '-createdAt',
    page = '1',
    limit = '10',
  } = query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {};

  // Category filter
  if (category) {
    filter.category = category;
  }

  // Price range filter
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Featured filter
  if (isFeatured) {
    filter.isFeatured = isFeatured === 'true';
  }

  // Active filter
  if (isActive) {
    filter.isActive = isActive === 'true';
  }

  // Search filter
  if (search) {
    filter.$text = { $search: search };
  }

  // Pagination
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limitNumber),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

const getProductById = async (id: string) => {
  const result = await Product.findById(id).populate('category', 'name slug');

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  return result;
};

const getProductBySlug = async (slug: string) => {
  const result = await Product.findOne({ slug }).populate(
    'category',
    'name slug',
  );

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  return result;
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  // Check if category exists if category is being updated
  if (payload.category) {
    const categoryExists = await Category.findById(payload.category);
    if (!categoryExists) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
    }
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('category', 'name slug');

  return result;
};

const deleteProduct = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
};
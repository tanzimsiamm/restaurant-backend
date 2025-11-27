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
  const categoryExists = await Category.findById(payload.category);
  if (!categoryExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query: QueryParams) => {
  try {
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

    console.log('🔍 Product Query Parameters:', query);

    // Start with active products filter by default
    const filter: any = {
      isActive: true
    };

    // Category filter - handle 'all' and undefined cases
    if (category && category !== 'all' && category !== 'undefined') {
      // Validate MongoDB ObjectId format
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        const categoryExists = await Category.findOne({ 
          _id: category, 
          isActive: true 
        });
        
        if (categoryExists) {
          filter.category = category;
          console.log('✅ Filtering by category:', categoryExists.name);
        } else {
          console.log('❌ Category not found or inactive:', category);
          // Return empty results for invalid category
          return {
            products: [],
            pagination: {
              page: parseInt(page),
              limit: parseInt(limit),
              total: 0,
              totalPages: 0,
            },
          };
        }
      } else {
        console.log('⚠️ Invalid category ID format:', category);
      }
    } else {
      console.log('📦 Loading all categories products');
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

    // Active filter override
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    console.log('🎯 Final filter:', JSON.stringify(filter, null, 2));

    // Pagination
    const pageNumber = Math.max(1, parseInt(page));
    const limitNumber = Math.max(1, parseInt(limit));
    const skip = (pageNumber - 1) * limitNumber;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug order')
        .sort(sort)
        .skip(skip)
        .limit(limitNumber)
        .lean(), // Use lean for better performance
      Product.countDocuments(filter),
    ]);

    console.log(`📦 Found ${products.length} products out of ${total} total`);

    return {
      success: true,
      data: {
        products,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          total,
          totalPages: Math.ceil(total / limitNumber),
        },
      },
    };
  } catch (error) {
    console.error('❌ Error in getAllProducts:', error);
    throw error;
  }
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
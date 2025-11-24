import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Product name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(200, 'Name cannot exceed 200 characters')
      .trim(),

    slug: z
      .string()
      .min(1, 'Slug is required')
      .min(2, 'Slug must be at least 2 characters')
      .regex(
        /^[a-z0-9-]+$/,
        'Slug must contain only lowercase letters, numbers, and hyphens',
      )
      .trim(),

    description: z
      .string()
      .min(1, 'Description is required')
      .min(10, 'Description must be at least 10 characters')
      .max(2000, 'Description cannot exceed 2000 characters')
      .trim(),

    price: z
      .number()
      .min(0, 'Price cannot be negative'),

    discountPrice: z
      .number()
      .min(0, 'Discount price cannot be negative')
      .optional(),

    category: z
      .string()
      .min(1, 'Category is required')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID'),

    images: z
      .array(z.string().url('Invalid image URL'))
      .min(1, 'At least one image is required'),

    stock: z
      .number()
      .min(0, 'Stock cannot be negative')
      .default(0),

    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    rating: z.number().min(0).max(5).optional(),
    reviewCount: z.number().min(0).optional(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(200).trim().optional(),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .optional(),
    description: z.string().min(10).max(2000).trim().optional(),
    price: z.number().min(0).optional(),
    discountPrice: z.number().min(0).optional(),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    images: z.array(z.string().url()).optional(),
    stock: z.number().min(0).optional(),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
    rating: z.number().min(0).max(5).optional(),
    reviewCount: z.number().min(0).optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};

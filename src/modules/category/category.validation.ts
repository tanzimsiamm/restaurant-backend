import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Category name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .trim(),
    slug: z
      .string()
      .min(1, 'Slug is required')
      .min(2, 'Slug must be at least 2 characters')
      .max(50, 'Slug cannot exceed 50 characters')
      .regex(
        /^[a-z0-9-]+$/,
        'Slug must contain only lowercase letters, numbers, and hyphens'
      )
      .trim(),
    description: z
      .string()
      .max(500, 'Description cannot exceed 500 characters')
      .trim()
      .optional(),
    image: z.string().url('Invalid image URL').optional(),
    // Add validation for order
    order: z.number().min(0, 'Order cannot be negative').optional().default(0),
    isActive: z.boolean().optional().default(true),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .trim()
      .optional(),
    slug: z
      .string()
      .min(2, 'Slug must be at least 2 characters')
      .max(50, 'Slug cannot exceed 50 characters')
      .regex(
        /^[a-z0-9-]+$/,
        'Slug must contain only lowercase letters, numbers, and hyphens'
      )
      .trim()
      .optional(),
    description: z
      .string()
      .max(500, 'Description cannot exceed 500 characters')
      .trim()
      .optional(),
    image: z.string().url('Invalid image URL').optional(),
    // Add validation for order update
    order: z.number().min(0).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
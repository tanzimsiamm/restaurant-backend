import { z } from "zod";

const createSliderValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .min(2, "Title must be at least 2 characters")
      .max(100, "Title cannot exceed 100 characters")
      .trim(),

    subtitle: z
      .string()
      .max(150, "Subtitle cannot exceed 150 characters")
      .trim()
      .optional(),

    description: z
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .trim()
      .optional(),

    image: z.string().min(1, "Image is required").url("Invalid image URL"),

    buttonText: z
      .string()
      .max(50, "Button text cannot exceed 50 characters")
      .trim()
      .optional(),

    buttonLink: z.string().trim().optional(),

    order: z.number().min(0, "Order cannot be negative").default(0),

    isActive: z.boolean().optional().default(true),
  }),
});

const updateSliderValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(2, "Title must be at least 2 characters")
      .max(100, "Title cannot exceed 100 characters")
      .trim()
      .optional(),

    subtitle: z
      .string()
      .max(150, "Subtitle cannot exceed 150 characters")
      .trim()
      .optional(),

    description: z
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .trim()
      .optional(),

    image: z.string().url("Invalid image URL").optional(),

    buttonText: z
      .string()
      .max(50, "Button text cannot exceed 50 characters")
      .trim()
      .optional(),

    buttonLink: z.string().trim().optional(),

    order: z.number().min(0, "Order cannot be negative").optional(),

    isActive: z.boolean().optional(),
  }),
});

export const SliderValidation = {
  createSliderValidationSchema,
  updateSliderValidationSchema,
};

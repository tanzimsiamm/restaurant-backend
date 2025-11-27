import { z } from "zod";

const createSliderValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters" })
      .max(100, { message: "Title cannot exceed 100 characters" })
      .trim(),

    subtitle: z
      .string()
      .max(150, { message: "Subtitle cannot exceed 150 characters" })
      .trim()
      .optional(),

    description: z
      .string()
      .max(500, { message: "Description cannot exceed 500 characters" })
      .trim()
      .optional(),

    image: z.string().url({ message: "Invalid image URL" }),

    thumbnailImage: z
      .string()
      .url({ message: "Invalid thumbnail URL" })
      .optional(),

    buttonText: z
      .string()
      .max(50, { message: "Button text cannot exceed 50 characters" })
      .trim()
      .optional(),

    buttonLink: z.string().trim().optional(),

    bgColor: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid hex color format" })
      .optional()
      .default("#8B0000"),

    order: z
      .number()
      .min(0, { message: "Order cannot be negative" })
      .default(0),

    isActive: z.boolean().optional().default(true),
  }),
});

const updateSliderValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters" })
      .max(100, { message: "Title cannot exceed 100 characters" })
      .trim()
      .optional(),

    subtitle: z
      .string()
      .max(150, { message: "Subtitle cannot exceed 150 characters" })
      .trim()
      .optional(),

    description: z
      .string()
      .max(500, { message: "Description cannot exceed 500 characters" })
      .trim()
      .optional(),

    image: z.string().url({ message: "Invalid image URL" }).optional(),

    thumbnailImage: z
      .string()
      .url({ message: "Invalid thumbnail URL" })
      .optional(),

    buttonText: z
      .string()
      .max(50, { message: "Button text cannot exceed 50 characters" })
      .trim()
      .optional(),

    buttonLink: z.string().trim().optional(),

    bgColor: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid hex color format" })
      .optional(),

    order: z
      .number()
      .min(0, { message: "Order cannot be negative" })
      .optional(),

    isActive: z.boolean().optional(),
  }),
});

export const SliderValidation = {
  createSliderValidationSchema,
  updateSliderValidationSchema,
};

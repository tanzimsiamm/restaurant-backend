import { z } from 'zod';

const createTeamValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters" })
      .max(100, { message: "Name cannot exceed 100 characters" })
      .trim(),

    position: z
      .string()
      .nonempty({ message: "Position is required" })
      .min(2, { message: "Position must be at least 2 characters" })
      .max(100, { message: "Position cannot exceed 100 characters" })
      .trim(),

    image: z
      .string()
      .nonempty({ message: "Image is required" })
      .url({ message: "Invalid image URL" }),

    bio: z
      .string()
      .max(1000, { message: "Bio cannot exceed 1000 characters" })
      .trim()
      .optional(),

    order: z
      .number()
      .min(0, { message: "Order cannot be negative" })
      .default(0),

    isActive: z.boolean().optional().default(true),

    socialLinks: z
      .object({
        facebook: z.string().url({ message: "Invalid Facebook URL" }).optional(),
        twitter: z.string().url({ message: "Invalid Twitter URL" }).optional(),
        instagram: z.string().url({ message: "Invalid Instagram URL" }).optional(),
        linkedin: z.string().url({ message: "Invalid LinkedIn URL" }).optional(),
      })
      .optional(),
  }),
});


const updateTeamValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(100, { message: "Name cannot exceed 100 characters" })
      .trim()
      .optional(),

    position: z
      .string()
      .min(2, { message: "Position must be at least 2 characters" })
      .max(100, { message: "Position cannot exceed 100 characters" })
      .trim()
      .optional(),

    image: z.string().url({ message: "Invalid image URL" }).optional(),

    bio: z
      .string()
      .max(1000, { message: "Bio cannot exceed 1000 characters" })
      .trim()
      .optional(),

    order: z.number().min(0, { message: "Order cannot be negative" }).optional(),

    isActive: z.boolean().optional(),

    socialLinks: z
      .object({
        facebook: z.string().url({ message: "Invalid Facebook URL" }).optional(),
        twitter: z.string().url({ message: "Invalid Twitter URL" }).optional(),
        instagram: z.string().url({ message: "Invalid Instagram URL" }).optional(),
        linkedin: z.string().url({ message: "Invalid LinkedIn URL" }).optional(),
      })
      .optional(),
  }),
});


export const TeamValidation = {
  createTeamValidationSchema,
  updateTeamValidationSchema,
};
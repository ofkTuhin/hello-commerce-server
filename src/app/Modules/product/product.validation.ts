import { z } from "zod";

const createProductZodSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  image: z.string().optional(),
  price: z.number().optional(),
  size: z.string().optional(),
  description: z.string().optional(),
  brand: z.string().optional(),
  color: z.string().optional(),
  availability: z.boolean().optional(),
});

export const ProductValidaion = {
  createProductZodSchema,
};

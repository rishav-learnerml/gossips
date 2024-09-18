import z from "zod";

//validation schemas
export const signupSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const signinSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const createPostSchema = z.object({
  title: z.string().min(10),
  content: z.string().min(20),
  thumbnail: z.string(),
});

export const putPostSchema = z.object({
  id: z.string(),
  title: z.string().min(10),
  content: z.string().min(20),
  thumbnail: z.string(),
});

//type inference

export type signupInputType = z.infer<typeof signupSchema>;
export type signinInputType = z.infer<typeof signinSchema>;
export type createPostType = z.infer<typeof createPostSchema>;
export type putPostType = z.infer<typeof putPostSchema>;

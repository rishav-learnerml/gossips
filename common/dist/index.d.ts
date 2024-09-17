import z from "zod";
export declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    name?: string | undefined;
}, {
    username: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signinSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const createPostSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    authorId: z.ZodString;
    thumbnail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    authorId: string;
    thumbnail: string;
}, {
    title: string;
    content: string;
    authorId: string;
    thumbnail: string;
}>;
export declare const putPostSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    thumbnail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    thumbnail: string;
    id: string;
}, {
    title: string;
    content: string;
    thumbnail: string;
    id: string;
}>;
export type signupInputType = z.infer<typeof signupSchema>;
export type signinInputType = z.infer<typeof signinSchema>;
export type createPostType = z.infer<typeof createPostSchema>;
export type putPostType = z.infer<typeof putPostSchema>;

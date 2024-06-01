import z from "zod";
export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

//type inference in zod
//it is used in the front end
export type SignupInput = z.infer<typeof signinInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type SigninInput = z.infer<typeof signinInput>;

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});
export type createBlogInput = z.infer<typeof createBlogInput>;

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});
export type updateBlogInput = z.infer<typeof updateBlogInput>;

//above required for post&put end points

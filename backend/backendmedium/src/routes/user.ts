import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@lucirace/medium-common";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();
//c is an object which stands for context(has all the req,res,environment variables etc.)
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect inputs",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  //below is necessary
  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }
  const jwt = await sign({ id: user.id }, "secret");
  return c.text(jwt);
});
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect inputs",
    });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    const token = await sign({ id: user.id }, "secret");

    return c.text(token);
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("Invalid");
  }
});

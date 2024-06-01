import { Hono } from "hono";
import { createBlogInput, updateBlogInput } from "@lucirace/medium-common";
import { decode, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  //extract user id
  //pass to the route handler
  const header = c.req.header("Authorization") || "";
  //in above space is given just to specify the type string of the header
  // const token = header.split("")[1];
  try {
    const user = await verify(header, "secret");
    if (user) {
      //or can simply add @ts-ignore
      c.set("userId", user.id); //added an extra key so need to add above
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (e) {}
  c.status(403);
  return c.json({ error: "unauthorized" });
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect inputs",
    });
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId, //use parseInt or Number for converting to integer
    },
  });
  return c.json({
    id: blog.id,
  });
});
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Incorrect inputs",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: blog.id,
  });
});
//pagination must be done where give only 10 blogs if ask more then give more
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,

      id: true,

      author: {
        select: {
          email: true,
        },
      },
    },
  });
  //const posts = await prisma.post.find({});
  return c.json({
    blogs,
  });
});
//need to put bulk route above as it was taking bulk as an id(string) giving null as response
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            email: true,
          },
        },
      },
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(404);
    return c.json({
      msg: "Error while fetching blog",
    });
  }
});

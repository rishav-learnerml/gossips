import { Hono } from "hono";
import { authChecker } from "../middlewares/authChecker";
import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: any;
  };
}>();

blogRouter.use("/*", authChecker);

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: 1,
      published: body.published,
      thumbnail: body.thumbnail,
    },
  });

  return c.json(
    {
      id: blog.id,
    },
    200
  );
});
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      thumbnail: body.thumbnail,
    },
  });

  return c.json(
    {
      id: blog.id,
    },
    200
  );
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    return c.json(
      {
        blog,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        error: "Error fetching blog post!",
      },
      411
    );
  }
});

//pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allBlogs = await prisma.post.findMany();

    return c.json(
      {
        allBlogs,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        error: "Error fetching blog posts!",
      },
      411
    );
  }
});

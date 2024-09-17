import { Hono } from "hono";
import { authChecker } from "../middlewares/authChecker";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostSchema, putPostSchema } from "@rishav_dev/gossips-types";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", authChecker);

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const body = await c.req.json();

  const { success, error } = createPostSchema.safeParse(body);
  if (!success) {
    return c.json(
      {
        error: "Invalid Inputs!",
        details: error,
      },
      400
    );
  }

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
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
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();
  const { success, error } = putPostSchema.safeParse(body);
  if (!success) {
    return c.json(
      {
        error: "Invalid Inputs!",
        details: error,
      },
      400
    );
  }

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

//pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany();

    return c.json(
      {
        blogs,
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

//if not bulk then definately an id

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


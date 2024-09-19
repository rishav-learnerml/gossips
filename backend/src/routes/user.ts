import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinSchema, signupSchema } from "@rishav_dev/gossips-types";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  //c-> req,res,json everything in single object
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success, error } = signupSchema.safeParse(body);
  if (!success) {
    return c.json(
      {
        error: "Invalid Inputs!",
        details: error,
      },
      400
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.username,
        password: body.password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(
      {
        jwt,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        error: "Error while signing up!",
        details: error,
      },
      403
    );
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success, error } = signinSchema.safeParse(body);
  if (!success) {
    return c.json(
      {
        error: "Invalid Inputs!",
        details: error,
      },
      400
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.username,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "Wrong Credentails!" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});

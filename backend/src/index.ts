import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: any;
  };
}>().basePath("/api/v1");

app.use("/blog/*", async (c, next) => {
  // Step 1: Get the Authorization header
  const authHeader = c.req.header("Authorization");

  // Step 2: Verify the Authorization header (assuming it's a JWT)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If header is missing or not in the correct format, return 403
    return c.json({ error: "Authorization header missing or malformed" }, 403);
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  // Step 3: Verify the token
  const response = await verify(token, c.env.JWT_SECRET); // Using hono's JWT verify
  // If token verification fails, return 403
  if (!response.id) {
    return c.json({ error: "Invalid or expired token" }, 403);
  }
  c.set("userId", response.id);
  // Proceed to next middleware or route handler
  await next();
});

app.post("/signup", async (c) => {
  //c-> req,res,json everything in single object
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(
      {
        token,
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

app.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});

app.post("/blog", (c) => {
  return c.text("Hello Hono!");
});
app.post("/blog", (c) => {
  return c.text("Hello Hono!");
});
app.get("/blog/:id", (c) => {
  return c.text("Hello Hono!");
});

export default app;

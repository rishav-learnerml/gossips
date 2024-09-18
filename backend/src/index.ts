import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: any;
  };
}>().basePath("/api/v1");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://gossips.rishav.site"],
  })
);
app.route("/user", userRouter);
app.route("/blog", blogRouter);

export default app;

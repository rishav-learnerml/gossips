import { verify } from "hono/jwt";
import { SignatureKey } from "hono/utils/jwt/jws";

export const authChecker = async (
  c: {
    req: { header: (arg0: string) => any };
    json: (arg0: { error: string }, arg1: number) => any;
    env: { JWT_SECRET: SignatureKey };
    set: (arg0: string, arg1: {}) => void;
  },
  next: () => any
) => {
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
};

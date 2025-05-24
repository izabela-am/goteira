import z from "zod";

const createUserSchema = {
  schema: {
    tags: ["users"],
    description: "Create new user",
    body: z.object({
      email: z.string().email(),
      password: z.string().min(8).max(70),
    }),
    response: {
      201: z
        .object({
          userId: z.string(),
        })
        .describe("User was created successfully"),
    },
  },
};

const loginSchema = {
  schema: {
    tags: ["auth"],
    description: "User login",
    body: z.object({
      email: z.string().email(),
      password: z.string().min(8).max(70),
    }),
    response: {
      201: z
        .object({
          access_token: z.string(),
        })
        .describe("User logged in successfully"),
    },
  },
};

export { createUserSchema, loginSchema };

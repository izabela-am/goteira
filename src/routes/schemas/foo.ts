import z from "zod";

const fooSchema = {
  schema: {
    tags: ["foo"],
    description: "foo",
    response: {
      201: z.object({
        message: z.string()
      }).describe("foo description"),
    },
  },
};

export { fooSchema };

import "dotenv/config";
import { fastify } from "fastify";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifySwagger } from "@fastify/swagger";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import { routes } from "./routes/routes";

const { JWT_SECRET } = process.env;

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyJwt, {
  secret: JWT_SECRET!,
});
app.register(fastifyCookie);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Goteira",
      version: "1.0.0",
    },
  },
});

app.register(routes);

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(fastifyCors, { origin: "*" });

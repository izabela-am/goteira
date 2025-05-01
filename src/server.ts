import { fastify } from 'fastify';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { fastifySwagger } from '@fastify/swagger';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';

import { routes } from './routes/routes';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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

app.register(fastifyCors, { origin: '*' });

app.listen({ port: 3333 }).then(() => {
  console.log('Server is up and running @ port 3333');
});

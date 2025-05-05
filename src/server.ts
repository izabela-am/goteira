import { app } from "./app";
import { client } from "./providers/database/redis";

import { AppLogger } from "./providers/logger/winston";

function start() {
  const logger = new AppLogger();

  app.listen({ port: 3333 }).then(async () => {
    logger.log({
      level: "info",
      message: "HTTP server is up and running @ port 3333",
    });
  });

  client.connect().then(() => {
    logger.log({
      level: "info",
      message: "HTTP server is up and running @ port 3333",
    });
  });
}

start();

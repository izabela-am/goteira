import { app } from "./app";
import { client } from "./providers/database/redis";

app.listen({ port: 3333 }).then(async () => {
  client.connect().then(() => {
    console.log("Redis server is up and running");
  });

  console.log("HTTP server is up and running @ port 3333");
});

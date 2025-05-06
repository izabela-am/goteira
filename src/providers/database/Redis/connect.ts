import type { RedisClientType } from "redis";
import { createClient } from "redis";

const client: RedisClientType = createClient();

export { client };

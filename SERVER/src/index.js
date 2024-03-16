// Import the framework and instantiate it
import Fastify from "fastify";

import rescript from "../lib/rescript.js";

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

fastify.post("/unminify", async function handler(request, reply) {
  const data = await request.body;

  if (!data.code) {
    reply.code(400).send({ error: "No code provided" });
  }
  const code = data.code;
  const result = await rescript(code);
  console.log("====================================");
  console.log(result);
  console.log("====================================");
  reply.code(200).send({ data: result });
});

// Run the server!
try {
  await fastify.listen({ port: 4000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

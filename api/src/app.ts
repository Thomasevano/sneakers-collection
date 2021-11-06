import fastify, { FastifyInstance } from 'fastify';

function app():FastifyInstance {
  const server = fastify();

  server.get('/ping', async() => 'pong\n');

  return server;
}

export { app };

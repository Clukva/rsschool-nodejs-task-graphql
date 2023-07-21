import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      try {
        const { query } = req.body;
        const res = await graphql({ schema: schema, source: query });
        return res;
      } catch (err) {
        console.error('GraphQL error:', err);
        return { err: 'Internal Server Error' };
      }

      /* return {}; */
    },
  });
};

export default plugin;

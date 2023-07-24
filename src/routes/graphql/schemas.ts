import { Type } from '@fastify/type-provider-typebox';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const Member_Type = new GraphQLObjectType({
  name: 'MemberName',
  fields: () => ({
    id: { type: GraphQLString },
    discount: {
      type: GraphQLInt,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  }),
});

const PostsType = new GraphQLObjectType({
  name: 'Posts',
  fields: () => ({
    id: { type: GraphQLString },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    /*  authorId: {
      type: GraphQLString,
    }, */
  }),
});

const ProfilesType = new GraphQLObjectType({
  name: 'Profiles',
  fields: () => ({
    id: { type: GraphQLString },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    /*     userId: {
      type: GraphQLString,
    },
    memberTypeId: {
      type: GraphQLString,
    }, */
  }),
});
/* const stat = new GraphQLObjectType({
  name: 'Stat',
  fields: () => ({
    model: { type: GraphQLString },
    operation: {
      type: GraphQLString,
    },
    args: {
      type: GraphQLString,
    },
  }),
});
const stats = new GraphQLObjectType({
  name: 'Stats',
  fields: () => ({
    operationHistory: { type: new GraphQLList(stat) },
  }),
}); */

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLInt,
    },
  }),
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'GraphQLSchema',
    fields: {
      memberTypes: {
        type: new GraphQLList(Member_Type),
        args: {},
        async resolve() {
          return await prisma.memberType.findMany();
          /* prisma. */
        },
      },

      memberType: {
        type: Member_Type,
        args: { id: { type: GraphQLString } },
        async resolve(parent, args: { id: string }) {
          if (!args?.id) {
            return {};
          }
          const res = await prisma.memberType.findUnique({
            where: {
              id: args.id ? args.id : 'basic',
            },
          });
          return res;
        },
      },
      /*  stats: {
        type: new GraphQLList(Member_Type),
        args: {},
        async resolve() {
          return await prisma.  .findMany();
      
        },
      }, */

      posts: {
        type: new GraphQLList(PostsType),
        args: {},
        async resolve() {
          return await prisma.post.findMany();
        },
      },

      post: {
        type: PostsType,
        args: { id: { type: GraphQLString } },
        async resolve(parent, args: { id: string }) {
          if (!args?.id) {
            return {};
          }

          return await prisma.post.findUnique({
            where: {
              id: args.id,
            },
          });
        },
      },

      users: {
        type: new GraphQLList(UserType),
        args: {},
        async resolve() {
          return await prisma.user.findMany();
        },
      },

      user: {
        type: UserType,
        args: { id: { type: GraphQLString } },
        async resolve(parent, args: { id: string }) {
          if (!args?.id) {
            return {};
          }

          return await prisma.user.findUnique({
            where: {
              id: args.id,
            },
          });
        },
      },

      profiles: {
        type: new GraphQLList(ProfilesType),
        args: {},
        async resolve() {
          return await prisma.profile.findMany();
        },
      },

      profile: {
        type: ProfilesType,
        args: { id: { type: GraphQLString } },
        async resolve(parent, args: { id: string }) {
          if (!args?.id) {
            return {};
          }

          return await prisma.profile.findUnique({
            where: {
              id: args.id,
            },
          });
        },
      },
    },
  }),
});

import { Type } from '@fastify/type-provider-typebox';
import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

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

export const MemberType = new GraphQLObjectType({
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

export const PostsType = new GraphQLObjectType({
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

export const ProfilesType = new GraphQLObjectType({
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
/*            hero: { type: characterInterface, ... },
 */         }
       }),
       

})
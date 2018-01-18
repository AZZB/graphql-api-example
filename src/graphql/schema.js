import {
    GraphQLSchema,
    GraphQLObjectType,
} from 'graphql';
import { userQueries } from './user/queries';
import { userMutations } from './user/mutations';

const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
       ...userQueries,
    }),
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        ...userMutations,
    }),
});

const schema = new GraphQLSchema({
    query,
    mutation, 
});


export default schema;
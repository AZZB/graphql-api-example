import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';

export const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'the id of the user',
        },

        username: {
            type: new GraphQLNonNull(GraphQLString),
        },

        fullname: {
            type: GraphQLString,
            resolve: (user) => {
                LOG('v user', user);
                return 'BENEKA AZZEDDINE';
            }
        }
    }),
});

export const UserAuthReturn = new GraphQLObjectType({
    name: 'UserAuthReturn',
    fields: () => ({
        user: {
            type: User,
        },
        token: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }),
});
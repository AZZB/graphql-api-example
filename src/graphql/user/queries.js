import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import {
    User,
} from './types';
import UserController from '../../controllers/user';

const users = {
    type: GraphQLList(User),
    resolve: async () => {
        return await UserController.getUsers();
    },
};

const user = {
    type: User,
    args: {
        username: {
            type: GraphQLNonNull(GraphQLString),
            description: "username of the user",
        },
    },
    resolve: async (root, { username }, context) => {
        return await UserController.getUser({username});
    },
}

export const userQueries = {
    users,
    user,
}
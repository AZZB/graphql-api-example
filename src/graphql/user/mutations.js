import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString, 
} from 'graphql';
import {
    User,
    UserAuthReturn,
} from './types';
import UserController from '../../controllers/user';

const login = {
    type: UserAuthReturn,
    args: {
        login: {
            type: GraphQLNonNull(GraphQLString),
        },
        password: {
            type: GraphQLNonNull(GraphQLString),
        }
    },
    resolve: async (root, { login, password }) => {
        return await UserController.login({login, password});
    },
}

const register = {
    type: UserAuthReturn,
    args: {
        username: {
            type: GraphQLNonNull(GraphQLString),
        },
        email: {
            type: GraphQLNonNull(GraphQLString),
        },
        password: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
    resolve: async (root, { username, email, password }) => {
        return await UserController.regiser({username, email, password});
    },
}


export const userMutations = {
    login,
    register,
}
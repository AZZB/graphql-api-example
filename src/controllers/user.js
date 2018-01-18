import jwt from 'jsonwebtoken';
import Accounts from '../contexts/accounts';
import errorHandler from '../lib/errorHandler';
import { SECRET_JWT, jwtConfig } from '../configs';

async function regiser(params) {
    try {
        const user = await Accounts.create_user(params);
        const token = jwt.sign({id: user._id, username: user.username}, SECRET_JWT, jwtConfig);
        return {
            user,
            token,
        };
    } catch(e) {
        LOG('UserController:register', e);
        await errorHandler(e)
    }
}

async function login(params) {
    try {
        const user = await Accounts.authenticate_by_login_password(params);
        const token = jwt.sign({id: user._id, username: user.username}, SECRET_JWT, jwtConfig);
        return { 
            user,
            token,
        };
    } catch (e) {
        LOG('UserController:login', e);
        await errorHandler(e)
    }
}

async function getUsers() {
    try {
        const users = await Accounts.get_users();
        return users;
    } catch (e) {
        LOG('UserController:getUsers', e);
        await errorHandler(e)
    }
}

async function getUser({username}) {
    try {
        const user = await Accounts.get_user(username);
        return user;
    } catch (e) {
        LOG('UserController:getUser', e);
        await errorHandler(e)
    }
}

export default {
    regiser,
    login,
    getUsers,
    getUser,
}
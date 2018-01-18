import User from './User';

async function get_users() {
    const users = await User.find({});
    return users;
}

async function get_user(username) {
    const user = await User.findOne({username});
    if(!user || user.deleted_at) {
        throw new CustomError('User not found')
    } 
    return user;
}

async function create_user({username, email, password}) {
    if(!password || password.length < 4) {
        throw new CustomError('Invalid input', {password: 'password is required with 3 min length'});
    }
    const user = await User.create({username, credential: { email, password }});
    return user;
}

async function authenticate_by_login_password({login, password}) {
    const user = await User.findOne({$or: [{'credential.email': login}, {'username': login}]})
    if(!user) {
        throw new CustomError("Authentication failed", {login: "this login does not exist"})
    }
    const isMatch = await user.checkPassword(password)
    if(!isMatch) {
        throw new CustomError("Authentication failed", { password: "this password is wrong" })
    }
    return user;
} 

export default {
    get_users,
    get_user,
    create_user,
    authenticate_by_login_password,
};
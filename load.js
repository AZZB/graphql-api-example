import CustomError from './src/lib/CustomError'
require('dotenv').config();

global.__DEV__ = process.env.NODE_ENV !== 'production'
global.CustomError = CustomError

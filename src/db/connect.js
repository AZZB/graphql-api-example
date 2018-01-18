import mongoose from 'mongoose'
import run_seeds from './seeds'

mongoose.Promise = global.Promise

async function connect(env = "dev", options = {}) {

    if(mongoose.connection.db) {
      console.log('the connection is already opened');
      return;
    }

    const config = env === 'dev'? devConfig : env === 'test'? testConfig : prodConfig
    options = {...config.options, options}

    try {
      await mongoose.connect(config.url, options)
      console.log('connection to mongodb success');
      await run_seeds(env)
    } catch (e) {
      console.log('--------- Mongodb connection failed --------------');
      console.log(e);
      console.log('--------------------------------------------------');
    }
}

const devConfig = {
  url: 'mongodb://localhost:27017/question-answers-dev',
  options: {
    useMongoClient: true,
  },
}

const testConfig = {
  url: 'mongodb://localhost:27017/question-answers-test',
  options: {},
}

const prodConfig = {
  url: '',
  options: {},
}

export default connect

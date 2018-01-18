import './load'
import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import connectToDB from './src/db/connect';
import schema from './src/graphql/schema';

connectToDB()

const app = express()

function context(req) {
  return {
    headers: req.headers,
    req,
  }
}

app.use(cors());

app.use('/graphql', graphqlHTTP(async (req) => {

  return {
    schema: schema,
    graphiql: true,
    context: context(req),
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path,
    }),
  };
}));

app.listen(4000, (err) => {
  if(err) {
    return console.log("server failed: ", err);
  }
  console.log('server running at port 4000');
});

global.LOG = (message, ...args) => {
  if(!__DEV__) return;

  console.log('/ ---------------'+ message +'------------------ ');
  console.log(...args);
  console.log(' ----------------------------------------------- / ');
}

import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import compression from 'compression';
import polka from 'polka';
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(json()) // enable your code to pass HTTP request bodies
  .use(compression({ threshold: 0 }), sirv('static', { dev }), sapper.middleware())
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });

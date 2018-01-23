import express from 'express'
import next from 'next'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import { MongoClient } from 'mongodb'

import configuration from './configuration'
import getModel from './model'
import api from './api'
import auth from './auth'

const port = parseInt(process.env.PP_PORT, 10) || configuration.get('port');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const mongoClient = MongoClient.connect(configuration.get('mongodb:url'));

app.prepare()
.then(() => {
  const server = express();

  server.use(cookieParser());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(session({
    secret: 'xxx' /* TODO configuration.get('session_secret') */,
    resave: false,
    saveUninitialized: true,
  }));

  auth.setupServer(server);

  server.use((req, res, next) => {
    req.configuration = configuration;
    req.apiFactories = api.factories;
    req.devMode = dev;
    req.allowTestLogin = process.env.PP_TEST_LOGIN === 'allowed';
    req.getModel = async () => {
      const model = await getModel({
        dataDir: configuration.get('data_dir'),
        dev: dev,
        mongoClient: await mongoClient,
      });
      return model;
    }
    next();
  });

  server.use(auth.router);

  server.use('/api', api.router);

  server.get('/debug', (req, res) => res.json(!req.devMode ? null : { user: req.user, session: req.session }));

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port} (pid ${process.pid})`)
  })
})

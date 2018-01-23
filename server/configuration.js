import path from 'path'
import nconf from 'nconf'
import yaml from 'js-yaml'

const confPath = process.env.PP_CONF /* || path.join(__dirname, '../configuration.yaml') */;

if (confPath) {
  nconf.file({
    file: confPath,
    format: {
      parse: (obj, options) => yaml.safeLoad(obj),
      stringify: (obj, options) => yaml.safeDump(obj),
    }
  });
}

nconf.defaults({
  port: 3000,
  data_dir: path.join(__dirname, '../data'),
  google_oauth2: {
    client_id: null,
    client_secret: null,
    callback_url: 'https://example.com/auth/google/callback',
  },
  facebook_login: {
    app_id: null,
    app_secret: null,
    callback_url: 'https://example.com/auth/facebook/callback',
  },
  mongodb: {
    url: 'mongodb://127.0.0.1/pyladies_portal_dev'
  },
});

//console.info('configuration:', nconf.get());

export default nconf;

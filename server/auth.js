import { Router } from 'express'
import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { Strategy as FacebookStrategy } from 'passport-facebook'

import configuration from './configuration'

const setupServer = (server) => {
  server.use(passport.initialize());
  server.use(passport.session());
}

const router = Router();

export default { router, setupServer };

passport.serializeUser((user, done) => {
  done(null, { userId: user.id });
})

passport.deserializeUser((req, { userId }, done) => {
  done(null, {
    id: userId,
    get: async () => {
      const model = await req.getModel();
      const user = await model.users.getById(userId);
      return user;
    },
  });
})

//
// Google
// ------
//

if (configuration.get('google_oauth2:client_secret')) {

  passport.use(new GoogleStrategy(
    {
      clientID:       configuration.get('google_oauth2:client_id'),
      clientSecret:   configuration.get('google_oauth2:client_secret'),
      callbackURL:    configuration.get('google_oauth2:callback_url'),
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      console.info("profile:", profile);
      const userInfo = {
        googleId: profile.id,
        displayName: profile.displayName,
      };
      req.getModel().then(model => {
        return model.users.getOrCreateByGoogleId(userInfo);
      }).then(user => {
        done(null, {
          id: user.id,
          get: async () => user,
        });
      }).catch(err => done(err, null));
    }
  ));

}

router.get('/auth/google/',
  passport.authenticate('google', {
    // prompt: 'select_account',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ]
  }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

//
// Facebook
// --------
//

if (configuration.get('facebook_login:app_secret')) {

  passport.use(new FacebookStrategy({
      clientID: configuration.get('facebook_login:app_id'),
      clientSecret: configuration.get('facebook_login:app_secret'),
      callbackURL: configuration.get('facebook_login:callback_url'), // "http://www.example.com/auth/facebook/callback"
      passReqToCallback: true,
    },
    function(req, accessToken, refreshToken, profile, done) {
      console.info("profile:", profile);
      const userInfo = {
        facebookId: profile.id,
        displayName: profile.displayName,
      };
      req.getModel().then(model => {
        return model.users.getOrCreateByFacebookId(userInfo);
      }).then(user => {
        done(null, {
          id: user.id,
          get: async () => user,
        });
      }).catch(err => done(err, null));
    }
  ));

}

router.get('/auth/facebook/',
  passport.authenticate('facebook', {
    scope: 'public_profile,email',
  }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

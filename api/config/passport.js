const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const config = require('./config')
const User = mongoose.model('User');
const isAdmin = require('../middleware/isAdmin');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

passport.use(new FacebookStrategy({
      clientID: config.facebook_client_id,
      clientSecret: config.facebook_client_secret,
      callbackURL: config.facebook_callback_url,
      profileFields: ['email','id', 'first_name', 'gender', 'last_name', 'picture']
    },
    (accessToken, refreshToken, profile, done) => {
      const data = {
        email: profile._json.email,
        name: profile._json.given_name,
        surName: profile._json.family_name
      };
        User.findOne({'email': data.email}, (err, user) => {
            if(err){ return done(err);}
            if(user){
                isAdmin(user.email)
                    .then(req => {
                        user.isAdmin = req;
                        const token = user.generateJwt();
                        done(null, token);
                    })
                    .catch(err => {
                        user.isAdmin = false;
                        const token = user.generateJwt();
                        done(null, token);
                    })
            }else{
                const user = new User();
                user.email = data.email;
                user.name = data.name;
                user.role = 'student';
                user.save()
                    .then(response => done(null, response))
                    .catch(err => done(null, err));
            }
        });
    }
));

passport.use(new GoogleStrategy({
      clientID: config.google_client_id,
      clientSecret: config.google_client_secret,
      callbackURL: config.google_callback_url
    },
    (accessToken, refreshToken, profile, done) => {
      const data = {
        email: profile._json.email,
        name: profile._json.given_name,
        surName: profile._json.family_name
      };

       User.findOne({'email': data.email}, (err, user)=> {
          if(err){ return done(err);}
          if(user){
              isAdmin(user.email)
                  .then(req => {
                      user.isAdmin = req;
                      const token = user.generateJwt();
                      done(null, token);
                  })
                  .catch(err => {
                      user.isAdmin = false;
                      const token = user.generateJwt();
                      done(null, token);
                  })
          }else{
              const user = new User();
              user.email = data.email;
              user.name = data.name;
              user.role = 'student';
               user.save()
                  .then(response => done(null, response))
                  .catch(err => done(null, err));
          }
      });
    }
));

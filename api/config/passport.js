const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const authCredentials = require(`./credentials`);
const User = mongoose.model('User');


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
      clientID: authCredentials.facebookAuth.clientID,
      clientSecret: authCredentials.facebookAuth.clientSecret,
      callbackURL: authCredentials.facebookAuth.callbackURL,
      profileFields: ['email','id', 'first_name', 'gender', 'last_name', 'picture']
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
                const token = user.generateJwt();
                done(null, token);
            }else{
                const user = new User();
                user.email = data.email;
                user.name = data.name;
                user.save()
                    .then(response => done(null, response))
                    .catch(err => done(null, err));
            }
        });
    }
));

passport.use(new GoogleStrategy({
      clientID: authCredentials.googleAuth.clientID,
      clientSecret: authCredentials.googleAuth.clientSecret,
      callbackURL: authCredentials.googleAuth.callbackURL
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
            const token = user.generateJwt();
            done(null, token);
          }else{
              const user = new User();
              user.email = data.email;
              user.name = data.name;
               user.save()
                  .then(response => done(null, response))
                  .catch(err => done(null, err));
          }
      });
    }
));

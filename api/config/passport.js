const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
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
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['email','id', 'first_name']
    },
    (accessToken, refreshToken, profile, done) => {
      const data = {
        email: profile._json.email,
        name: profile._json.given_name
      };
        done(null, {user: {data: data}});
        User.findOne({'email': data.email}, (err, user) => {
            if(err){ return done(err);}
            if(user){
                const token = user.generateJwt();
                done(null, token);
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
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
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
              user.role = 'student';
               user.save()
                  .then(response => done(null, response))
                  .catch(err => done(null, err));
          }
      });
    }
));

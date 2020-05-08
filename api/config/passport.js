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
      profileFields: ['email', 'first_name', 'last_name']
    },
    (accessToken, refreshToken, profile, done) => {
      const data = {
        email: profile._json.email,
        name: profile._json.first_name,
        surName: profile._json.last_name
      };
        User.findOne({'email': data.email}, (err, user) => {
            if(err){ return done(err);}
            if(user){
                done(null, {
                    token: user.generateJwt(),
                    _id: user._id,
                    name: user.name,
                    surName: user.surName,
                    email: user.email,
                    role: user.role
                });
            }else{
                const user = new User();
                user.email = data.email;
                user.name = data.name;
                user.role = 'student';
                user.surName = data.surName;
                user.save()
                    .then(response => done(null, {
                        token: user.generateJwt(),
                        name: user.name,
                        surName: user.surName,
                        email: user.email,
                        role: user.role
                    }))
                    .catch(err => done(err));
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
               done(null, {
                   token: user.generateJwt(),
                   _id: user._id,
                   name: user.name,
                   surName: user.surName,
                   email: user.email,
                   role: user.role
               });
           }else{
              const user = new User();
              user.email = data.email;
              user.name = data.name;
              user.role = 'student';
              user.surName = '';
              user.save()
                  .then(response => done(null, {
                      token: user.generateJwt(),
                      _id: user._id,
                      name: user.name,
                      email: user.email,
                      role: user.role,
                      surName: user.surName
                  }))
                  .catch(err => done(err));
          }
      });
    }
));

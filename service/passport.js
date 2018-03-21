const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'body[username]',
            passwordField: 'body[password]'
        },
        (username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Hibás felhasználónév'
                    });
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Hibás jelszó.' });
                }
                return done(null, user);
            });
        }
    )
);

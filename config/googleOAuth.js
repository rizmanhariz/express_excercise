const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/redirect'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // find a user
                let user = await User.findOne({ googleId: profile.id});
                if (!user) {
                    // create a user
                    let newUser = {
                        googleId: profile.id,
                        name: profile.displayName,
                        isAdmin: false,
                    }
                    user = await User.create(newUser);

                };
                // pass the user along
                done(null, user);

            } catch (err) {
                console.error(err);
                return done(err, profile)
            };
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    })
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    })
}
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./model/Users'); 


function initialize(passport) {
    const authenticateUser = (username, password, done) => {
        User.findOne({ username: username }, async (err, user) => {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, { message: "There is no user that goes by that email." });
            try {
                //The input password from the log in form should always be in the first argument
                //The password stored in the database should be in the second argument of bcrypt.compare
                if (await bcrypt.compare(password, user.password)) {
                    const username = user.username;
                    return done(null, user, username);
                }
                else {
                    console.log('Incorrect password')
                    return done(null, false, {message: "Incorrect password."})

                }
            } catch (e) {
                console.log("Error in authentication: ", e)
                return done(e)
            }
        })
    }

    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            if (err) {
                return done(err)
            }
            const username = user.username;
            done(err, user, username);
        })
    })
}

module.exports = initialize; 
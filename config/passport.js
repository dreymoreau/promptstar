const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport){
    passport.use( 
new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    },
    
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            // finding a user and assigning it to the user variable
            let user = await User.findOne({googleId: profile.id})

            // check if user exists
            if(user){
                done(null, user)
            } else {
                // if user doesnt exist create the user by passing in the newUserobject to the database
                user = await User.create(newUser)
                done(null, user)
            }
        } catch(err){ 
            console.error(err)
        }
       }
      )
    )

    //hiding or showing the user id to look against the database

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    // passport.deserializeUser(async(id,done) => {
    //     try{
    //         let user = await User.findById(id)
    //         if(!user){
    //             return done(new Error('user not found'))
    //         }
    //         done(null, user)
    //     } catch (err){
    //         console.error(err)
    //     }
    // })

    passport.deserializeUser(async (id, done) => {
        done(null, await User.findById(id))
    })
}
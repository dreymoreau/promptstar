const express = require('express')
const passport = require('passport')
const router = express.Router()

// @description Auth with Google
// @route GET /auth/google

router.get('/google', passport.authenticate('google', {scope: ['profile']}))

// @description Google auth callback
// @route GET /auth/google/callback

// if successful send to index.js dashboard render which leads to dashboard being rendered
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),(req,res) => {
    res.redirect('/dashboard')
})

// router.get('/oauth2/redirect/google', passport.authenticate('google', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   }));

// @description Logout User
// @route /auth/logout
// Passport 0.6 requires logout to be async 

router.get('/logout', (req, res, next) => {
    req.logout(function(err){
        if(err){
            return next(err)
        }
        res.redirect('/')
    })
})

module.exports = router
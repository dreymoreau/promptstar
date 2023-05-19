const express = require('express')
const router = express.Router()
//destructuring to bring in multiple things at one time from the same place ((like in react))
const {ensureAuth, ensureGuest} = require('../middleware/auth')

// @description Login/Landing page
// @route GET / 

//added ensureGuest from middleware => auth to make sure who are guests will always get kicked out
router.get('/', ensureGuest, (req,res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @description Dashboard
// @route GET /dashboard

//added ensureAuth from middleware => auth to make sure who are logged in wont be be showed the dashboard
router.get('/dashboard', ensureAuth, (req,res) => {
    res.render('dashboard')
})

module.exports = router
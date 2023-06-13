const express = require('express')
const router = express.Router()
//destructuring to bring in multiple things at one time from the same place ((like in react))
const {ensureAuth} = require('../middleware/auth')
const Story = require('../models/Story')

// @description show add page
// @route GET /stories/add

//added ensureAuth from middleware
router.get('/add', ensureAuth, (req,res) => {
    res.render('stories/add')
})

// @description Process the add form
// @route POST /stories

//added ensureAuth from middleware
router.post('/', ensureAuth, async(req,res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.error(err)
        res.render('error/500')
        
    }
})


module.exports = router

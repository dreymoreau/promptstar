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

// @description show all stories
// @route GET /stories

//added ensureAuth from middleware
router.get('/', ensureAuth, async (req,res) => {
    try {
        const stories = await Story.find({status: 'public'})
        .populate('user')
        .sort({createdAt: 'desc'})
        // taking from a mongoose object to a plain json object, handlebars wouldnt be able to read the mongoose object 
        .lean()
        res.render('stories/index', {
            stories,
        })
    } catch(err) {
        console.error(err)
        res.render('error/500')
    }
})

// @description show single story
// @route GET /stories/:id

router.get('/:id', ensureAuth, async (req,res) => {
    try {
        let story = await Story.findById(req.params.id)
        .populate('user')
        .lean()

        if(!story){
            return res.render('error/404') 
        }

        res.render('stories/show', {
            story
        })
    } catch(err){
        console.error(err)
        res.render('error/404')
    }
})

// @description show edit page for story
// @route GET /stories/edit/:id

router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
      const story = await Story.findOne({
        // telling the method to look inside the route and grab the id parameter 
        _id: req.params.id,
      }).lean()
  
      if (!story) {
        return res.render('error/404')
      }
      //if the user is not logged in they wont be able to edit another users story, redirect to the story page
      if (story.user != req.user.id) {
        res.redirect('/stories')
      } else {
        res.render('stories/edit', {
          story,
        })
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

//@desc Update Story
//@Route PUT /stories/:id
router.put('/:id', ensureAuth, async (req,res) => {
    try{
        let story = await Story.findById(req.params.id).lean()

        if(!story) {
            return res.render('error/404')
        }

        if(story.user != req.user.id) {
            res.redirect('/stories')
        } else {
        story = await Story.findOneAndUpdate({_id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })

        res.redirect('/dashboard')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})


// @description Delete story
// @route DELETE /stories/:id

router.delete('/:id', ensureAuth, async (req, res) => {
    try {
      let story = await Story.findById(req.params.id).lean()
  
      if (!story) {
        return res.render('error/404')
      }
  
      if (story.user != req.user.id) {
        res.redirect('/stories')
      } else {
        await Story.deleteOne({ _id: req.params.id })
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

 // @description User story
// @route GET /stories/user/:userId

router.get('/user/:userId', ensureAuth, async (req,res) => {
    try {
        // only find the public stories, keeps private stories from not being able to be seen for privacy
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public'
        })
        .populate('user')
        .lean()

        res.render('stories/index', {
            stories 
        })
    } catch(err) {
        console.error(err)
        res.render('error/500')
    }
})
module.exports = router

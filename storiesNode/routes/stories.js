const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../helpers/auth');
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');

// stories index
router.get('/', (req, res) => {
  Story.find({ status: 'public' })
    .populate('user')
    .sort({ date: 'desc' })
    .then(stories => res.render('stories/index', { stories }));
});

// show single story
router.get('/show/:id', (req, res) => {
  Story.findOne({ _id: req.params.id })
    .populate('user')

    .populate('comment.commentUser')
    .then(story => {
      if (story.status == 'public') {
        res.render('stories/show', { story });
      } else {
        if (req.user) {
          if (req.user.id == story.user._id) {
            res.render('stories/show', { story });
          } else {
            res.redirect('/stories');
          }
        } else {
          res.redirect('/stories');
        }
      }
    });
});

// add stories
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add');
});

// process add story to DB
router.post('/', (req, res) => {
  let allowComments;
  if (req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }
  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments,
    user: req.user.id
  };
  // create story
  new Story(newStory).save().then(story => {
    res.redirect(`/stories/show/${story.id}`);
  });
});

// edit story
router.get('/edit/:id', ensureAuth, (req, res) => {
  Story.findOne({ _id: req.params.id }).then(story => {
    if (story.user != req.user.id) {
      res.redirect('/stories');
    } else {
      res.render('stories/edit', { story });
    }
  });
});

// process edit in DB
router.put('/:id', (req, res) => {
  Story.findOne({ _id: req.params.id }).then(story => {
    let allowComments;
    if (req.body.allowComments) {
      allowComments = true;
    } else {
      allowComments = false;
    }
    // new values
    (story.title = req.body.title),
      (story.body = req.body.body),
      (story.status = req.body.status),
      (story.allowComments = allowComments);

    story.save().then(story => {
      res.redirect('/dashboard');
    });
  });
});

// delete story
router.delete('/:id', (req, res) => {
  Story.deleteOne({ _id: req.params.id }).then(() =>
    res.redirect('/dashboard')
  );
});

// add comment
router.post('/comment/:id', (req, res) => {
  Story.findOne({ _id: req.params.id }).then(story => {
    const newComment = {
      commentBody: req.body.commentBody,
      commentUser: req.user.id
    };
    // push to comments array
    story.comment.unshift(newComment);
    story.save().then(story => {
      res.redirect(`/stories/show/${story.id}`);
    });
  });
});

// list stories from user
router.get('/user/:userId', (req, res) => {
  Story.find({ user: req.params.userId, status: 'public' })
    .populate('user')
    .then(stories => {
      res.render('stories/index', { stories });
    });
});

// login user stories (my stories)
router.get('/my', ensureAuth, (req, res) => {
  Story.find({ user: req.user.id })
    .populate('user')
    .then(stories => {
      res.render('stories/index', { stories });
    });
});

module.exports = router;

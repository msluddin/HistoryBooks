const express = require('express')

const passport = require('passport')

const router = express.Router()

//@Description Auth with Google
//@route GET/ auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

//@Description Google auth callback
//@route GET/auth/google/callback

router.get('/google/callback', passport.authenticate('google', {failureRedirect:'/'}), 
(req, res) => {
    res.redirect('/dashboard')
})

//@Description Auth with Github
//@route GET/ auth/github
router.get('/github', passport.authenticate('github', {scope: ['profile']}))

//@Description Github auth callback
//@route GET/auth/github/callback

router.get('/github/callback', passport.authenticate('github', {failureRedirect:'/'}), 
(req, res) => {
    res.redirect('/dashboard')
})


//@description logout user
//@route  /auth/logout

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = router
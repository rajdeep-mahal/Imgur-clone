var express   = require('express');
var router    = express.Router();

// Middleware
var { isAuthenticated, isNotAuthenticated, isValidImageLink, isValidProfileLink, isValidSearchLink } = require('../middleware/routeProtectors');

router.get('/', (req, res, next) => {
  res.render('index', {root: 'views'});
});

router.get('/error', (req, res, next) => {
  res.render('error',{root: 'views'});
});

router.get('/login', isNotAuthenticated, (req, res, next) => {
  res.render('login',{root: 'views'});
});

router.get('/register', isNotAuthenticated, (req, res, next) => {
  res.render('register',{root: 'views'});
});

router.get('/search', isValidSearchLink, (req, res, next) => {
  res.render('search',{root: 'views'});
});

router.get('/image', isValidImageLink, (req, res, next) => {
  res.render('image', {root: 'views'});
});

router.get('/profile', isValidProfileLink, (req, res, next) => {
  res.render('profile', {root: 'views'});
});

router.get('/postImage', isAuthenticated, (req, res, next) => {
  res.render('postImage', {root: 'views'});
});

module.exports = router;

const express = require('express');
const members = require('./members');
const posts = require('./posts');
const auth = require('./auth');
const jwtMiddleware = require('../../lib/jwtMiddleware');

const api = express.Router();

api.use('/', jwtMiddleware);
/* GET users listing. */
api.use('/members', members);
api.use('/posts', posts);
api.use('/auth', auth);

module.exports = api;

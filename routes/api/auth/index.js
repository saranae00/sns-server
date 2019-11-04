const express = require('express');
const authCtrl = require('./auth.ctrl');
const utils = require('../../utils/utils');

const auth = express.Router();

/* GET users listing. */
auth.post('/login', utils.wrapAsync(authCtrl.login));
auth.get('/loginChk', utils.wrapAsync(authCtrl.loginChk));
auth.post('/logout', utils.wrapAsync(authCtrl.logout));

module.exports = auth;

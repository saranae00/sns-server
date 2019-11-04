const express = require('express');
const membersCtrl = require('./members.ctrl');
const utils = require('../../utils/utils');

const members = express.Router();

/* GET users listing. */
members.get('/', utils.wrapAsync(membersCtrl.list));
members.post('/', utils.wrapAsync(membersCtrl.join));
members.delete('/:id', utils.wrapAsync(membersCtrl.delete));
members.get('/:id', utils.wrapAsync(membersCtrl.read));
members.get('/findByMemberId', utils.wrapAsync(membersCtrl.findByMemberId));
members.get('/findByMemberName', utils.wrapAsync(membersCtrl.findByMemberName));
members.get(
  '/findByMemberNickName',
  utils.wrapAsync(membersCtrl.findByMemberNickName)
);
members.patch('/:id', utils.wrapAsync(membersCtrl.update));

module.exports = members;

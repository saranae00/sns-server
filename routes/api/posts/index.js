const express = require('express');
const postCtrl = require('./posts.ctrl');
const utils = require('../../utils/utils');
const chkLogged = require('../../../lib/chkLogged');

const posts = express.Router();

/* GET users listing. */
posts.get('/', utils.wrapAsync(postCtrl.list));
posts.post('/', chkLogged, utils.wrapAsync(postCtrl.write));

posts.delete(
  '/:id',
  postCtrl.checkObjectId,
  chkLogged,
  utils.wrapAsync(postCtrl.delete)
);
posts.get('/:id', postCtrl.checkObjectId, utils.wrapAsync(postCtrl.read));
posts.patch(
  '/:id',
  postCtrl.checkObjectId,
  chkLogged,
  utils.wrapAsync(postCtrl.update)
);

module.exports = posts;

/*
Post
{
  title: String,
  content: String,
  tags: Number,
  publishedDate: {
    type: Date,
    default: Date.now
  },
  member: {
    _id: mongoose.Types.ObjectId,
    memberId: String
  }
}
*/
const Post = require('../../../models/posts');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

exports.checkObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).send();
    return;
  }
  return next();
};

// 글 목록 (최근 순)
exports.list = async (req, res, next) => {
  const posts = await Post.find()
    .sort({ _id: -1 })
    .limit(10)
    .exec();
  res.json(posts);
};

// 글쓰기
exports.write = async (req, res, next) => {
  const { title, content, tags } = req.body;

  const post = new Post({
    title: title,
    content: content,
    tags: tags,
    member: req.decoded
  });

  await post.save();
  res.json(post);
};

// 글삭제
exports.delete = async (req, res, next) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id).exec();
  res.status(204).send();
};

// 긁 읽기
exports.read = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id).exec();
  res.json(post);
};

// 태그로 글 찾기
exports.findByTag = async (req, res, next) => {
  const { tags } = req.body;
  const posts = await Post.find({ tags: tags }).exec();
  res.json(posts);
};

//  업데이트
exports.update = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true
  }).exec();
  res.json(post);
};

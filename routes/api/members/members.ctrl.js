/*
Member
{
  id: String,
  password: String,
  name: String,
  nickName: String,
  phoneNumber: String,
  email: String,
  followerNum:Number,
  follower: Array,
  follow: Array
}
*/
const Member = require('../../../models/members');

// 회원 목록 (follower 많은 순)
exports.list = async (req, res, next) => {
  const members = await Member.find()
    .sort({ followerNum: -1 })
    .exec();
  res.json(members);
};

// 회원 가입
exports.join = async (req, res, next) => {
  const {
    id,
    password,
    nickName,
    name,
    email,
    phoneNumber,
    follower,
    follow
  } = req.body;

  // 중복 id 검사
  const exist = await Member.findByMemberId(id);
  if (exist) {
    res.status(409).send();
    return;
  }

  const member = new Member({
    memberId: id,
    nickName: nickName,
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    followerNum: 0,
    follower: follower,
    follow: follow
  });
  await member.setPassword(password);
  await member.save();

  const result = member.serialize();
  res.json(result);
};

// 회원 탈퇴
exports.delete = async (req, res, next) => {
  const { _id } = req.body;
  await Member.findByIdAndDelete(_id).exec();
  res.status(204).send();
};

// 아이디로 회원 찾기
exports.findById = async (req, res, next) => {
  const { _id } = req.body;
  const members = await Member.findById(_id).exec();
  res.json(members);
};

// 멤버 아이디로 회원 찾기
exports.findByMemberId = async (req, res, next) => {
  const { memberId } = req.body;
  const members = await Member.findOne({ memberId: memberId }).exec();
  res.json(members);
};

// 이름으로 회원 찾기
exports.findByMemberName = async (req, res, next) => {
  const { name } = req.body;
  const members = await Member.find({ name: name }).exec();
  res.json(members);
};

// 닉네임으로 회원 찾기
exports.findByMemberNickName = async (req, res, next) => {
  const { name } = req.body;
  const members = await Member.find({ nickName: nickName }).exec();
  res.json(members);
};

//  업데이트
exports.update = async (req, res, next) => {
  const { id } = req.body;
  const members = await Member.findByIdAndUpdate(id, req.body, {
    new: true
  }).exec();
  res.json(members);
};

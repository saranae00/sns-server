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

exports.login = async (req, res, next) => {
  const { id, password } = req.body;
  // 입력값에 id나 password가 없을 경우
  if (!id || !password) {
    res.status(401).send();
    return;
  }

  const member = await Member.findByMemberId(id);
  // 계정이 존재하지 않을 경우
  if (!member) {
    res.status(401).send();
    return;
  }

  const chkPwd = await member.checkPassword(password);
  // 비밀 번호가 틀린 경우
  if (!chkPwd) {
    res.status(401).send();
    return;
  }

  // 쿠키 설정
  const token = member.createToken();
  res.cookie('access_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 2,
    httpOnly: true
  });
  const result = member.serialize();
  res.json(result);
};

exports.loginChk = async (req, res, next) => {
  const member = req.decoded;
  // 로그인 상태가 아닐 때
  if (!member) {
    res.status(401).send();
    return;
  }
  res.send(member);
};

exports.logout = async (req, res, next) => {
  res.cookie('access_token');
  res.status(204).send();
};

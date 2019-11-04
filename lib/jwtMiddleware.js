const jwt = require('jsonwebtoken');
const Member = require('../models/members');

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;

  // 토큰이 없을 경우
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.decoded = {
      _id: decoded._id,
      memberId: decoded.id
    };

    const now = Math.floor(Date.now());

    if (decoded.exp - now < 60 * 60 * 24 * 3) {
      const member = await Member.findById(decoded._id);
      const token = member.createToken();
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      });
    }

    return next();
  } catch (e) {
    // 토큰 키가 맞지 않을 경우
    return next();
  }
};

module.exports = jwtMiddleware;

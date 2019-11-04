const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const memberSchema = new Schema({
  id: String,
  password: String,
  name: String,
  nickName: String,
  phoneNumber: String,
  email: String,
  followerNum: Number,
  follower: Array,
  follow: Array
});

memberSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.password = hash;
};

memberSchema.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

memberSchema.methods.serialize = function() {
  const result = this.toJSON();
  delete result.password;
  return result;
};

memberSchema.statics.findByMemberId = function(id) {
  return this.findOne({ id });
};

memberSchema.methods.createToken = function(password) {
  const token = jwt.sign(
    {
      _id: this._id,
      id: this.id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  );
  return token;
};

const member = mongoose.model('member', memberSchema);
module.exports = member;

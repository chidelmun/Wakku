var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    set: function (value) {return value.trim().toLowerCase()},
  },
  email: {
    type: String,
    required: true,
    set: function(value) {return value.trim().toLowerCase()},
    validate: [
      function (email) {
        return validator.isEmail(email);
      }
    ]
  },
  password: { type: String, required: true },
  admin: { type: Boolean, default: true },
  thumbnail: String,
  avatar: { type: String, default: 'img/avatar.png'}
});
/*
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, function (err, hash) {
      this.password = hash;
      next();
    });
  });
});
*/
module.exports = mongoose.model('User', userSchema);
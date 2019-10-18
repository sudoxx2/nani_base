const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // first_name: {
  //   type: String,
  //   required: true
  // },
  // last_name: {
  //   type: String,
  //   required: true
  // },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

module.exports = User = mongoose.model('user', UserSchema);
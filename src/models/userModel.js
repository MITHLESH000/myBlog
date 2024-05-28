// // src/models/userModel.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const Schema = mongoose.Schema;

// const SALT_WORK_FACTOR = 10;

// const UserSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// UserSchema.pre('save', function(next) {
//   const user = this;

//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });

// const User = mongoose.model('User', UserSchema);
// module.exports = User;

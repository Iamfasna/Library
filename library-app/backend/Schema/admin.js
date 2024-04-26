const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
  adminName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  loggedIn: {
    type: Boolean,
    default: false
  }
});

// Middleware to hash password before saving
adminSchema.pre('save', function(next) {
  console.log('start')
  
  const user = this
  

  // Only hash the password if it has been modified or is new
  if (!user.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt and hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);

    // Replace the plaintext password with the hashed one
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


module.exports = mongoose.model("admin", adminSchema);

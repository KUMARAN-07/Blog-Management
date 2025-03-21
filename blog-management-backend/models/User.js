const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Debug log
console.log('User model loaded...');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// ✅ Compare hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('Comparing entered:', enteredPassword);
  console.log('With hashed:', this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

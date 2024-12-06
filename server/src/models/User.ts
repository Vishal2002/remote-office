import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


// Enum for user roles
const UserRoleEnum = ['User', 'Admin'];

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  avatarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Avatar',
    default: null,
  },
  role: {
    type: String,
    enum: UserRoleEnum,
    default: 'User'
  },
  spaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space'
  }]
}, {
  timestamps: true,
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword:string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
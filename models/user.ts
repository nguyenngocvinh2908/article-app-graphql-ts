import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    password: String,
    email: String,
    token: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema, "users")

export default User
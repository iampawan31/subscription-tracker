import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User Name is required'],
      trim: true,
      minLength: 2,
      maxLength: 30
    },
    email: {
      type: String,
      required: [true, 'User Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: [true, 'User Password is required'],
      minLength: 6
    }
  },
  {
    timestamps: true // Automatically manage createdAt and updatedAt fields
  }
)

const User = mongoose.model('User', userSchema)

export default User

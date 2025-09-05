import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  address: {
    street: String,
    city: String,
    zipcode: String,
    geo: { lat: String, lng: String }
  },
  role: { type: String, enum: ['Admin', 'Manager', 'User'], default: 'User' },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('User', userSchema)

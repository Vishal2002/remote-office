import mongoose from 'mongoose';

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  elements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SpaceElement'
  }]
}, {
  timestamps: true,
});

export const Space = mongoose.model('Space', spaceSchema);
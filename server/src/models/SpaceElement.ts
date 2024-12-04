import mongoose from 'mongoose';

const spaceElementSchema = new mongoose.Schema({
  elementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Element',
    required: true,
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

export const SpaceElement = mongoose.model('SpaceElement', spaceElementSchema);
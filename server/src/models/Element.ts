import mongoose from 'mongoose';

const elementSchema = new mongoose.Schema({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  static: {
    type: Boolean,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  spaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SpaceElement'
  }],
  mapElements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MapElement'
  }]
}, {
  timestamps: true,
});

export const Element = mongoose.model('Element', elementSchema);
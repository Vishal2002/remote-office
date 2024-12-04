import mongoose from 'mongoose';

const mapSchema = new mongoose.Schema({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  mapElements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MapElement'
  }]
}, {
  timestamps: true,
});

export const Map = mongoose.model('Map', mapSchema);
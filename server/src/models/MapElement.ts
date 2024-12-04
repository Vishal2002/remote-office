import mongoose from 'mongoose';

const mapElementSchema = new mongoose.Schema({
  mapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Map',
    required: true,
  },
  elementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Element',
    required: true,
  },
  x: {
    type: Number,
    default: null,
  },
  y: {
    type: Number,
    default: null,
  }
}, {
  timestamps: true,
});

export const MapElement = mongoose.model('MapElement', mapElementSchema);
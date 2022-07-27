const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    enum: [
      'Basic',
      'Detailed',
    ]
  },
  subjects: {
    type: Array,
    index: 1,
  },  
  streams: {
    type: Array,
    index: 1
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
  }
});

module.exports = mongoose.model('trainings', TrainingSchema);

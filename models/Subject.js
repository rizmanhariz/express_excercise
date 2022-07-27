const mongoose = require('mongoose');
const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  stream: {
    type: String,
    enum: [
      'Science',
      'Arts',
      'Commerce'
    ]
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

module.exports = mongoose.model('subjects', SubjectSchema);

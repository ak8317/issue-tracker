const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'New',
  },
  owner: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  priority: {
    type: String,
    default: 'low',
  },
  completionDate: {
    type: Date,
  },
});
module.exports = Issues = mongoose.model('issues', IssueSchema);

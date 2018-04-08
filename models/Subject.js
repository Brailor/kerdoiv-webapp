/* Schema a téma modelhez */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  teachers: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  activeQuestionnaires: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Subject', SubjectSchema);

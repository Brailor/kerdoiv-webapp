/* Schema a User model számára */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    default: ['TANAR']
  },
  questionnaires: {
    type: [Schema.Types.ObjectId],
    ref: 'Questionnaire'
  },
  completedQuestionnaires: {
    type: [Schema.Types.ObjectId],
    ref: 'Questionnaire'
  }
});

module.exports = mongoose.model('User', UserSchema);

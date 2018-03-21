/* Schema a kérdőív model számára */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionnaireSchema = new Schema({
    madeBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    voteCount: Number,
    questions: [
        {
            title: {
                type: String,
                required: true
            },
            qType: String,
            answerOpts: [String]
        }
    ]
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);

const mongoose = require('mongoose');
const Questionnaire = mongoose.model('Questionnaire');

module.exports = {
    /*  {params} 
        qa      -> questionnaire object
        user    -> user mongoose model who creates the questionnaire
        return  -> questionnaire model which can be saved to the database
     */
    createQuestionnaire(qa, userId) {
        const questionnaire = new Questionnaire({
            madeBy: userId,
            title: qa.title,
            description: qa.description,
            voteCount: qa.voteCount || 0,
            questions: [...qa.questions]
        });
        return questionnaire;
    },

    async findAllByUserId(userId) {
        let questionList;

        try {
            questionList = await Questionnaire.find({ madeBy: userId }).exec();
        } catch (err) {
            console.error('Hiba a questionList lekérdezése során func: findAllByUserId', err);
        }

        return questionList;
    },

    async findBySubject(subject) {
        let questionList;

        try {
            questionList = await Questionnaire.find({ subject: subject }).exec();
        } catch (err) {
            console.error('Hiba a questionList lekérdezése során func: findBySubject', err);
        }

        return questionList;
    }
};

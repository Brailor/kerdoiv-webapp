const mongoose = require('mongoose');
const Questionnaire = mongoose.model('Questionnaire');

module.exports = {
  /*  {params} 
        questionnaire       -> questionnaire object
        user                -> user mongoose model who creates the questionnaire
        return              -> questionnaire model which can be saved to the database
     */
  createQuestionnaire(questionnaire, userId) {
    const questionnaire = new Questionnaire({
      madeBy: userId,
      title: questionnaire.title,
      description: questionnaire.description,
      voteCount: questionnaire.voteCount || 0,
      questions: [...questionnaire.questions]
    });
    return questionnaire;
  },

  async findById(id) {
    let questionnaire;

    try {
      questionnaire = await Questionnaire.findById(id)
        .populate('subject')
        .populate('madeBy')
        .exec();
    } catch (err) {
      console.error('Hiba a questionList lekérdezése során func: findById', err);
    }

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
      questionList = await Questionnaire.find({ subject: subject })
        .populate('subject')
        .populate('madeBy')
        .exec();
    } catch (err) {
      console.error('Hiba a questionList lekérdezése során func: findBySubject', err);
    }

    return questionList;
  }
};

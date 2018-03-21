const mongoose = require('mongoose');
const Subject = mongoose.model('Subject');

module.exports = {
    /*  {params} 
        qa      -> questionnaire object
        user    -> user mongoose model who creates the questionnaire
        return  -> questionnaire model which can be saved to the database
     */
    createSubject({ name, displayName }) {
        const subject = new Subject({
            name,
            displayName
        });

        return subject;
    },

    async findAll() {
        let subjects;

        try {
            subjects = await Subject.find({}).exec();
        } catch (err) {
            console.error(
                'Hiba a subjectList lekérdezése során func: findAll',
                err
            );
        }

        return subjects;
    }
};

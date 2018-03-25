const userService = require('../service/User/index');
const questionnaireService = require('../service/Questionnaire/index');
const subjectService = require('../service/Subject/index');
const authMW = require('../middleware/authMW');

module.exports = app => {
    app.get('/api/subjects', authMW, async (req, res) => {
        let subjects = await subjectService.findAll();

        res.send(subjects);
    });

    app.post('/api/create-subject', authMW, async (req, res) => {
        const subject = await subjectService.createSubject({
            name: req.body.subjectName,
            displayName: req.body.displayName
        });

        if (subject) {
            const newSubject = await subject.save();
            res.status(200).json(newSubject);
        }
        res.status(404).json({ message: 'Nem sikerült új témát hozzáadni!' });
    });

    app.get('/api/questionnaires', authMW, async (req, res) => {
        const questionnaires = await questionnaireService.findAllByUserId(req.user._id);
        console.log('questionnaires:', questionnaires);

        res.json({ questionnaires });
    });

    app.get('/api/questionnaire', authMW, async (req, res) => {
        const { subject } = req.query;
        const [subjectModel] = await subjectService.findBySubject(subject);

        if (subjectModel) {
            const questionnaires = await questionnaireService.findBySubject(subjectModel.id);
            //debugger;
            res.json(await questionnaires);
        }

        res.status(404).json({ msg: 'Nincs találat!' });
    });

    app.post('/api/create-questionnaire', authMW, async (req, res) => {
        // TODO: Validáció kell ide !!!!

        const { subject } = req.body.body;

        const questionnaire = questionnaireService.createQuestionnaire(req.body.body, req.user._id);
        if (subject) {
            const [subjectModel] = await subjectService.findBySubject(subject);
            if (subjectModel) questionnaire.subject = subjectModel.id;
        }

        const newQuestionnaire = await questionnaire.save();
        res.status(200).json(newQuestionnaire);
    });

    app.get('/api/logout', authMW, (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current-user', authMW, (req, res) => {
        console.log('user', req.user._id);
        res.send(req.user._id);
    });

    app.post('/api/register', async (req, res) => {
        const { username, password } = req.body;
        const user = userService.createUser({ username, password });

        const newUser = await user.save();
        res.status(200).json(newUser);
    });
};

const userService = require('../service/User/index');
const questionnaireService = require('../service/Questionnaire/index');
const subjectService = require('../service/Subject/index');
const authMW = require('../middleware/authMW');

module.exports = app => {
  app.get('/api/subjects', authMW, async (req, res) => {
    let subjects = await subjectService.findAll();

    res.json(subjects);
  });

  app.post('/api/create-subject', async (req, res) => {
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

    res.json({ questionnaires });
  });

  app.get('/api/questionnaire', authMW, async (req, res) => {
    if ('subject' in req.query) {
      const [subjectModel] = await subjectService.findBySubject(req.query.subject);

      if (subjectModel) {
        const questionnaires = await questionnaireService.findBySubject(subjectModel.id);
        res.json(questionnaires);

        return;
      }
    }

    if ('id' in req.query) {
      const questionnaire = await questionnaireService.findById(req.query.id);

      if (questionnaire) {
        res.json(questionnaire);
        return;
      }
    }

    res.status(404).json({ msg: 'Nincs találat!' });
  });

  app.post('/api/create-questionnaire', authMW, async (req, res) => {
    // TODO: Validáció kell ide !!!!
    const { subject } = req.body.body;

    const questionnaire = await questionnaireService.createQuestionnaire(req.body.body, req.user.get('id'));
    if (subject) {
      const [subjectModel] = await subjectService.findBySubject(subject);
      if (subjectModel) questionnaire.subject = subjectModel.id;
      debugger;
      const count = subjectModel.get('activeQuestionnaires');
    }

    const newQuestionnaire = await questionnaire.save();
    res.status(200).json(newQuestionnaire);
  });

  app.post('/api/submit-questionnaire', authMW, async (req, res) => {
    const { questionnaireID, answers } = req.body.body;
    const { user } = req;

    const questionnaire = await questionnaireService.findById(questionnaireID);

    const jsonData = {
      referenceID: questionnaireID,
      answers
    };

    const match = user.completedQuestionnaires.find(questionnaire => questionnaire.referenceID === questionnaireID);

    if (match) {
      res.json({ msg: 'Egyszer már kitöltötted ezt a kérdőívet', success: false });
      return;
    }
    user.completedQuestionnaires.push(jsonData);

    const updatedUser = await user.save();
    res.status(200).json({ updatedUser, success: true });
  });

  app.get('/api/logout', authMW, (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current-user', authMW, (req, res) => {
    res.send(req.user._id);
  });

  app.post('/api/register', async (req, res) => {
    const { username, password } = req.body.body;
    const user = userService.createUser({ username, password });

    const newUser = await user.save();
    res.status(200).json(newUser);
  });
};

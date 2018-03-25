const passport = require('passport');

module.exports = app => {
    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        res.send(req.session);
    });
};

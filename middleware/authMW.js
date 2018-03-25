const config = require('../config/index');

module.exports = (req, res, next) => {
    if (!req.user && !config.disableAuth) {
        return res.status(401).send({ error: 'Be kell jelentkezned!' });
    }

    next();
};
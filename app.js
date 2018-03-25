const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();

require('./models/User');
require('./models/Questionnaire');
require('./models/Subject');
require('./service/passport');

//A port amelyen futni fog a backend.
const PORT = 8080;

//DB connection
mongoose.connect('mongodb://127.0.0.1:27017/kerdoiv', err => {
    if (err) {
        console.log(`Valami hiba törént a MongoDB szerver csatlakozása közben: ${err}`);
        return;
    }
    console.log(`
###--------------------------------------------------###
# Szerver sikeresen csatlakozott a MongoDB szerverhez  #
###--------------------------------------------------###
`);
});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ['verysecretkey']
    })
);
app.use(passport.initialize());
app.use(passport.session());

//Route-ok beimportálása.
require('./routes/login')(app);
require('./routes/index')(app);

app.listen(PORT, () =>
    console.log(`
###----------------------------------###
#App elindult a <localhost:${PORT}>-on.#
###---------------------------------.###
`)
);

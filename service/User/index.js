const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    createUser(userObj) {
        const user = new User({
            username: userObj.username,
            password: userObj.password
        });
        return user;
    },

    async findByName(username) {
        let user;
        try {
            user = await User.findOne({ username }).exec();
            console.log('user?:', user);
        } catch (error) {
            console.log('Valami hiba törént:', error);
            user = null;
        }
        return user;
    },

    async findbById(id) {
        let user;
        try {
            user = await User.findById(id).exec();
            console.log('user?:', user);
        } catch (error) {
            console.log('Valami hiba törént:', error);
            user = null;
        }
        return user;
    }
};

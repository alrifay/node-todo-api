const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        required: [true, 'Where is your email?'],
        minlength: [5, 'Email is not correct!'],
        validate: {
            validator(email) {
                return /[a-zA-z]\w*@\w+\.\w+/.test(email);
            },
            msg: 'Email shit'
        },
        trim: true
    }
});

module.exports = User;
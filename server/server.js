const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: [true, 'Where is your todo?'],
        minlength: [5, 'To few characters!'],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

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
// const myTodo = new Todo({
//     text: ' g  '
// });
// myTodo.save().then(doc => {
//     console.log('todo saved', doc);
// }, error => {
//     console.log('error saving todo:', error.errors.text.message);
// });
const myUser = new User({
    email: 'X@cdd.d                '
});
myUser.save().then(doc => {
    console.log('User saved', doc);
}, error => {
    console.log('error saving user:', error.errors.email.message);
});
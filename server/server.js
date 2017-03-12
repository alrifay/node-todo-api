const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

const myTodo = new Todo({
    text: 'Mohamed',
    completed: false,
    completedAt: new Date().getUTCDate()
});

myTodo.save().then(doc => console.log('todo saved', doc), error => console.log('error saving todo', error));


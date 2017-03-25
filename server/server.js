const express = require('express');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('./database/mongoose');
const Todo = require('./models/Todo');
const User = require('./models/User');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    const todo = new Todo({
        text: request.body.text
    });

    todo.save().then((doc) => {
        response.send(doc);
    }, (e) => {
        let error = {};
        e = e.errors;
        for (let item in e) {
            error[item] = e[item].message;
        }
        response.status(400).send({
            error
        });
    });
});
app.get('/todos/:id', (request, response) => {
    if (!ObjectID.isValid(request.params.id)) {
        return response.status(400).send({
            error: 'id not valid'
        });
    }
    Todo.findById(request.params.id).then((todo) => {
        response.status(todo ? 200 : 404).send({
            todo
        });
    }, (e) => {
        response.status(400).send({
            error: e
        });
    }).catch((e) => {
        response.status(400).send({
            error: e
        });
    });
});
app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({
            todos
        });
    }, (error) => {
        response.status(400).send(error);
    });
});

app.use((request, response) => response.status(404).send({
    error: 'page not found!'
}));

app.listen(3000, () => {
    console.log('Server started at port 3000', 'http://localhost:3000');
});

module.exports = app;
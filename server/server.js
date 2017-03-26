const express = require('express');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('./database/mongoose');
const Todo = require('./models/Todo');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

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
            error: 'ID not valid'
        });
    }
    Todo.findById(request.params.id).then((todo) => {
        response.status(todo ? 200 : 404).send({
            todo
        });
    }).catch((e) => {
        response.status(400).send({
            error: e
        });
    });
});

app.delete('/todos/:id', (request, response) => {
    const id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(400).send({
            error: 'ID not valid'
        });
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        response.status(todo ? 200 : 404).send({
            todo
        });
    }).catch((error) => {
        response.status(400).send({
            error
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

app.listen(port, () => {
    console.log(`Server started at port ${port} http://localhost:${port}`);
});

module.exports = app;
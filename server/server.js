const express = require('express');
const bodyParser = require('body-parser');

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
        for(let item in e){
            error[item] = e[item].message;
        }
        response.status(400).send({error});
    });
});

app.listen(3000, () => {
    console.log('Server started at port 3000', 'http://localhost:3000');
});
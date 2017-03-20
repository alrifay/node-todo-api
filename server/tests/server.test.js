const expect = require('expect');
const request = require('supertest');
const faker = require('faker');
/* const mongoose = */require('./../database/mongoose');
const Todo = require('./../models/Todo');

const app = require('./../server');

beforeEach(done => {
    let todos = [{
        text: faker.random.words(4)
    }, {
        text: faker.random.words(4)
    }];

    Todo.remove().then(() => {
        return Todo.insertMany(todos);
    }).then(() => done(), done);
});

describe('POST /todos', () => {
    it('Should create a new Todo', done => {
        let text = 'This is Todo';
        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text);
            }).end((error) => {
                if (error) {
                    return done(error);
                }

                Todo.find({text}).then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(done);
            });
    });

    it('Should not create a Todo', done => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .expect(res => {
                // expect(res.body).toEqual({
                //     error: {
                //         text: 'Where is your todo?'
                //     }
                // });
            }).end((error) => {
                if (error) {
                    return done(error);
                }
                Todo.find().then(todos => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(done);
            });
    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(response => {
                expect(response.body.todos.length).toBe(2);
            })
            .end(done);
    });
});
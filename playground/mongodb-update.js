const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Error: Connecting to datebase.');
    }
    console.log('Connected successfully.');

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('58c2ca0745b83e13447ea29f')
    }, {
        $set: {
            name: 'Mohamed Al-Refay'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then(result => {
        console.log('------', result, '------');
    });
});
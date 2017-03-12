//const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID
} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Error: Connecting to datebase.');
    }
    console.log('Connected successfully.');

    db.collection('Users').deleteMany({
        name: 'Mohamed Refay'
    }).then(result => {
        console.log('------', result, '------');
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('58c49a2ff064031cf726bc88')
    }).then(console.log);

});
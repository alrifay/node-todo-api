const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Error: Connecting to datebase.');
    }
    console.log('Connected successfully.');

    db.collection('Todos').find().forEach(console.log);
    
    db.close();
});
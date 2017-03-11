const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Error: Connecting to datebase.');
    }
    console.log('Connected successfully.');
    db.collection('Todos').find().forEach(console.log);
    // db.collection('Todos').insertOne({
    //     text: 'do the thing.',
    //     completed: false
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Error: inserting data');
    //     }
    //     console.log('done', JSON.stringify(result, null, 4));
    // });
    // db.collection('Users').insertOne({
    //     name: 'Mohamed',
    //     age: 22,
    //     location: 'Helwan'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Error inserting data', error);
    //     }
    //     //result.ops[0]._id.get
    //     console.log('data inserted successfully', JSON.stringify(result.ops, undefined, 4));
    // });
    db.close();
});
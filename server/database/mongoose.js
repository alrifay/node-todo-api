const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://todos-api:AH709iIh1dqyHtIy@todos-api-shard-00-00-yeewx.mongodb.net:27017,todos-api-shard-00-01-yeewx.mongodb.net:27017,todos-api-shard-00-02-yeewx.mongodb.net:27017/TodoApp?ssl=true&replicaSet=todos-api-shard-0&authSource=admin', (error) => {
    if (error)
        console.log('Error connecting to database', error.message);
    else
        console.log('database connected');
});

module.exports = mongoose;
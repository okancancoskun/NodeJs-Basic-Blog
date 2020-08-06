const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;



const mongoConnect = (callback) => {
  
    MongoClient.connect('mongodb+srv://okan154:8318913@cluster0.cvoee.mongodb.net/Products?retryWrites=true&w=majority')
        .then(client => {
            console.log('connected');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const getdb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database';
}


exports.mongoConnect = mongoConnect;
exports.getdb = getdb;
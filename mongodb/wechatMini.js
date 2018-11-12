const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'wechatMini';
const insertDocuments = function(query, data, callback) {
    // Get the documents collection
    MongoClient.connect(dbUrl, { useNewUrlParser:true }, function (err, client) {
        if(err){
            console.log("===============");
            console.log(err);
        }
        const db = client.db(dbName);
        const collection = db.collection(query);
        // Insert some documents
        collection.insertMany(data, function(err, docs) {
            client.close();
            if(callback){callback(docs, err);}
        });
    });
};

const findDocuments = function(query, data,callback) {
    MongoClient.connect(dbUrl, { useNewUrlParser:true }, function (err, client) {
        if(err){
            console.log("===============");
            console.log(err);
        }
        const db = client.db(dbName);
        const collection = db.collection(query);
        collection.find(data).toArray(function(err, docs) {
            client.close();
            if(callback){callback(docs, err);}
        });
    });
};

const updateDocuments = function(query, searchKey, setData, callback) {
  MongoClient.connect(dbUrl, { useNewUrlParser:true }, function (err, client) {
    const db = client.db(dbName);
    const collection = db.collection(query);
    // Update document where a is 2, set b equal to 1
    collection.updateOne(searchKey
      , { $set: setData }, function(err, result) {
        callback(result,err);
        client.close();
      });
  })
};


module.exports = {
    insertDocuments: insertDocuments,
    findDocuments: findDocuments,
    updateDocuments: updateDocuments
};
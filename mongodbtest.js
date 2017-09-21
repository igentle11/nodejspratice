var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost", function (err, db) {
   
     if(err) throw err;

     //Write databse Insert/Update/Query code here..
     console.log('mongodb is running!');
     db.close(); //關閉連線           
});

//mongodb://igentle11:a01019174@ds115124.mlab.com:15124/igentle11

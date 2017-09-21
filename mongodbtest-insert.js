var MongoClient=require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost/admin",function(err,db){

	if(err) throw err;
	//Write databse Insert/Update/Query code here..
    db.collection('person',function(err,collection){
    	collection.insert({ id:1, firstName:'Steve', lastName:'Jobs' });
    	collection.insert({ id:2, firstName:'Bill', lastName:'Gates' });
    	collection.insert({ id:3, firstName:'James', lastName:'Bond' });
   
        collection.count(function(err,count){
 			if(err) throw err;
 			console.log('Total Rows:'+count);
        });

    });
    db.close(); //關閉連線
});

//mongodb://igentle11:a01019174@ds115124.mlab.com:15124/igentle11

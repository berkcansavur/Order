// const {MongoClient, ObjectId}=require('mongodb');
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);
// const dbName= 'orders-api';
// async function main(){
//     await client.connect();
//     console.log('Client is connected !');
//     const db = client.db(dbName);
// }
// main()
// .then(console.log("Connection method is working !"))
// .catch(console.error)
// .finally(()=>client.close());
// routes --> controllers --> services --> serviceCallers (marketOrder)
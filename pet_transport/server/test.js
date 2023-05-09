const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://202118006:testmongo@cluster0.p5cha2x.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
    try {
        await client.connect();
    
        const database = client.db('mydb');
        const collection = database.collection('mycollection');
    
        const doc = { name: 'John Doe', age: 25 };
        const result = await collection.insertOne(doc);
    
        console.log(result.insertedId + result.insertedCount + `\${result.insertedCount} documents were inserted with the _id: \${result.insertedId}`);
      } finally {
        await client.close();
      }
}
run().catch(console.dir);






gitpod /workspace/pet-transport-react/pet_transport/server (main) $ node test.js
644df83ea113215c898a52e4undefined${result.insertedCount} documents were inserted with the _id: ${result.insertedId}
gitpod /workspace/pet-transport-react/pet_transport/server (main) $ 
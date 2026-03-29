require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = "mongodb://Anil:Anil8055@ac-j2ftvlg-shard-00-00.ke1mmu1.mongodb.net:27017,ac-j2ftvlg-shard-00-01.ke1mmu1.mongodb.net:27017,ac-j2ftvlg-shard-00-02.ke1mmu1.mongodb.net:27017/?ssl=true&replicaSet=atlas-gv4ufx-shard-0&authSource=admin&appName=Urlshortner"
;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected successfully");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();
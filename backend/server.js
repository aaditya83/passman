require('dotenv').config()
const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require("cors")

const url = process.env.MONGOURL || 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const dbName = 'Passop';
const app = express()

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
].filter(Boolean)

app.use(express.json());
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }
        return callback(new Error('Not allowed by CORS'))
    }
}))
const port = process.env.PORT || 3000
client.connect();

app.get('/health', (req, res) => {
    res.json({ success: true })
})

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.post('/', async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true})
})

app.delete('/', async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

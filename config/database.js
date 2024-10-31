import { MongoClient } from 'mongodb';

const host = process.env.HOST || '';
const database = process.env.DATABASE || '';

export const client = new MongoClient(host)

let connection = null;

try {
    connection = await client.connect();
    console.log('Connected to database');
} catch (err) {
    console.error(err);
}

export async function testConnection() {
    try {
        const michelin = db.collection(COLLECTION)
        const restaurants = await michelin.find().limit(5).toArray()
        console.log(restaurants)
    } catch (err) {
        console.error(err)
    } finally {
        client.close()
    }
}

export const db = connection.db(database);

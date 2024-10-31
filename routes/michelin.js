import { ObjectId } from 'mongodb';
import { db, client } from '../config/database.js';
import express from 'express'

const michelinRouter = express.Router();

michelinRouter.get('/', async (req, res) => {
    const limitParam = Number(req.query.limit) || 5
    try {
        const collection = db.collection('michelin');
        const data = await collection.find().limit(limitParam).toArray();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

michelinRouter.get("/:id", async (req, res) => {
    const idParam = req.params.id;
    try {
        const collection = db.collection('michelin');
        const query = { _id: new ObjectId(idParam) }
        const data = await collection.findOne(query);
        if (!data) {
            res.status(404).send({ message: `Data with id ${idParam} not found` })
            return;
        }
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})




export default michelinRouter;
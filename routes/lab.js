import { ObjectId } from 'mongodb';
import { db, client } from '../config/database.js';
import express from 'express'

const router = express.Router();

// Lab 11
// endpoint: country/:country
router.get("/country/:country", async (req, res) => {
  const countryParam = req.params.country;
  try {
    const collection = db.collection('michelin');
    const query = { country: countryParam }
    const data = await collection.find(query).toArray();
    if (data.length === 0) {
      res.status(404).send({ message: `Not Found` })
      return;
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// /cuisine/:cuisine
router.get("/cuisine/:cuisine", async (req, res) => {
  const cuisineParam = req.params.cuisine;
  try {
    const collection = db.collection('michelin');
    const query = { cuisine: cuisineParam }
    const data = await collection.find(query).toArray();
    if (data.length === 0) {
      res.status(404).send({ message: `Not Found` })
      return;
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// countByCountry
router.get("/countByCountry", async (req, res) => {
  try {
    const collection = db.collection('michelin');
    const query = [
      {
        '$group': {
          '_id': '$country',
          'count': {
            '$sum': 1
          }
        }
      }
    ]
    const data = await collection.aggregate(query).toArray();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// noChefField
router.get("/noChefField", async (req, res) => {
  try {
    const collection = db.collection('michelin');
    const query = { chef: { $exists: false } }
    const data = await collection.find(query).toArray();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// chineseInLondon
router.get("/chineseInLondon", async (req, res) => {
  try {
    const collection = db.collection('michelin');
    const query = { cuisine: 'Chinese', city: 'London' }
    const data = await collection.find(query).toArray();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// creativeAndInnovative
router.get("/creativeAndInnovative", async (req, res) => {
  try {
    const collection = db.collection('michelin');
    const query = { cuisine: ['Creative', 'Innovative'] }
    const data = await collection.find(query).toArray();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// thaiCuisineNotInThailand
router.get("/thaiCuisineNotInThailand", async (req, res) => {
  try {
    const collection = db.collection('michelin');
    const query = { cuisine: 'Thai', country: { $ne: 'Thailand' } }
    const data = await collection.find(query).toArray();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// cuisine2
router.get("/cuisine2/:cuisine", async (req, res) => {
  const starParam = Number(req.query.stars) || 3
  try {
    const collection = db.collection('michelin');
    const query = { cuisine: req.params.cuisine, stars: starParam }
    const data = await collection.find(query).toArray()
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// top10Cuisine
router.get("/top10Cuisine", async (req, res) => {
  try {
    const collection = db.collection('michelin');
    const query = [
      {
        '$group': {
          '_id': '$cuisine',
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }, {
        '$limit': 10
      }
    ]
    const data = await collection.aggregate(query).toArray();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// thailandWithStreetfoodOrStars3
router.get("/thailandWithStreetfoodOrStars3", async (req, res) => {
  try {
    const collection = db.collection('michelin');
    const query = { country: 'Thailand', $or: [{ cuisine: 'Street food' }, { stars: 3 }] }
    const data = await collection.find(query).toArray();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

export default router

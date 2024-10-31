import express from 'express';
import cors from 'cors';
import "./config/dotenv.js";
import router from './routes/lab11.js';
import michelinRouter from './routes/michelin.js';

const PORT = process.env.PORT || 5050;
const app = express()

app.use(cors())
app.use(express.json())

app.use('/michelins', michelinRouter)
app.use('/', router)

app.get('/test', (req, res) => {
    res.status(200).send('Hello World')
})

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})

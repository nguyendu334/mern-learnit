import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/index.js';

dotenv.config();

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('CONNECTED TO MONGO DB');
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

route(app)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

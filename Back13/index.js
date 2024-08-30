require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { connectDB } = require('./src/config/db');
const motosRouter = require('./src/api/routes/motos');
const usersRouter = require('./src/api/routes/users');
const reviewsRouter = require('./src/api/routes/reviews');

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

fs.readFile('Alquiler.csv', 'utf-8', (error, data) => {
  console.log(data);
});

app.use('/api/v1/motos', motosRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.use('*', (req, res, next) => {
  return res.status(404).json('route not found');
});
app.listen(3000, () => {
  console.log('El servidor está levantado en: http://localhost:3000');
});

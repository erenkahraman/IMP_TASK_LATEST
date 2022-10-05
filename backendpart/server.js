const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const routesUrls = require('./routes/router.js');
const cors = require('cors');


mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('connected to db!'));

app.use(express.json());
app.use(cors());
app.use('/app', routesUrls);
app.listen(4000, () => (console.log('Server is running on port 4000')));

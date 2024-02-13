const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.Port || 5000;

const usersRoute = require('./routes/userRoute');
app.use('/api/user', usersRoute);

app.listen(port, () => {
    console.log(`Node server started on port ${port}`);
})
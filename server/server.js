const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.Port || 5000;

app.listen(port, () => {
    console.log(`Node server started on port ${port}`);
})
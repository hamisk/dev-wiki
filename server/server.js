require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const accountRoutes = require('./routes/accounts.js');
const pageRoutes = require('./routes/pages');

const port = 4000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/users', accountRoutes);
app.use('/page', pageRoutes);

app.listen(port, function () {
  console.log(`Connected to server at port ${port}`);
});

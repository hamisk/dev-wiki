const express = require('express');
const cors = require('cors');
const app = express();

const accountRoutes = require('./routes/accounts');

const port = 4000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/users', accountRoutes);

app.listen(port, function () {
  console.log(`Connected to server at port ${port}`);
});

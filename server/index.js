//express.js

const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.log(`Server listening on ${PORT}`);

app.listen(PORT);


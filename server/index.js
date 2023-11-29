//express.js

const path = require('path');

const express = require('express');

const postController = require('./controllers/posts.js');

const app = express();

const PORT = 3000;

app
    .use('/', express.static(path.join(__dirname, '../client/dist')))

    .use(express.json())

    .use('/api/v1/posts', postController)

    .get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    })


console.log(`Server listening on ${PORT}`);

app.listen(PORT);


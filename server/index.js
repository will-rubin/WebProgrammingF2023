//express.js

const path = require('path');

const express = require('express');

const postController = require('./controllers/posts.js');
const userController = require('./controllers/users.js');

const app = express();

const PORT = 3000;

app
    .use('/', express.static(path.join(__dirname, '../client/dist')))

    .use(express.json())

    // CORS
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        next();
    })

    .use('/api/v1/posts', postController)

    .use('/api/v1/users', userController)

    .get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'));
    })


console.log(`Server listening on ${PORT}`);

app.listen(PORT);


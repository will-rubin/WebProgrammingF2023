
const path = require('path');
const express = require('express');
require('dotenv').config();
const postController = require('./controllers/posts.js');
const userController = require('./controllers/users.js');
const { parseAuthorizationToken, requireUser } = require('./middleware/authorization.js');
const app = express();

const PORT = process.env.PORT ?? 3000;

app
    .use('/', express.static(path.join(__dirname, '../client/dist')))

    .use(express.json())

    // CORS
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', '*');
        if(req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    })

    .use(parseAuthorizationToken)

    .use('/api/v1/posts', postController)

    .use('/api/v1/users', userController)

    .get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    })

app
    .use((err, req, res, next) => {
        console.error(err);
        res
            .status(500).send(err.message)
            .json({message: err?.message || err});
    })

app.listen(PORT);
console.log(`Server listening on ${PORT}`);


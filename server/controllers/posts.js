const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
})

.get('/search', (req, res) => {
    res.send('Search results');
})

.get('/posts/:id', (req, res) => {
    res.send(`Post ${req.params.id}`);
});

module.exports = router;


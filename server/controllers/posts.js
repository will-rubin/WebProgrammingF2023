const express = require('express');
const { getPosts, getPostById } = require('../models/posts.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(getPosts());
})

.get('/search', (req, res) => {
    res.send('Search results');
})

.get('/posts/:id', (req, res) => {
    const post = getPostById(parseInt(req.params.id));
    if (post) {
        res.send(post);
    } else {
        res.status(404).send('Post not found');
    }
});

module.exports = router;


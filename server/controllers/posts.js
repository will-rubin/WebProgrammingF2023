const express = require('express');
const { getAllPosts, get, search, create, update, remove } = require('../models/posts.js');
const router = express.Router();

router.get('/', (req, res) => {
    getAllPosts()
    .then(posts => {
        res.send(posts);
    })
    .catch(next)
})

.get('/search', (req, res) => {
    const results = search(req.query.q);
    res.send(results);
})

.get('/posts/:id', (req, res) => {
    const post = get(+req.params.id);
    if (post) {
        res.send(post);
    } else {
        res.status(404).send('Post not found');
    }
})

.post('/', (req, res, next) => {
    const post = create(req.body);
    res.send(post);
})

.patch('/:id', (req, res, next) => {
    req.body.id = +req.params.id;
    const post = update(req.body);
    res.send(post);
})

.delete('/:id', (req, res, next) => {
    remove(+req.params.id);
    res.send({message: 'Post deleted successfully'});
});

module.exports = router;


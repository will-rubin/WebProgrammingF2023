const express = require('express');
const { getAllPosts, get, search, create, update, remove, seed } = require('../models/posts.js');
const router = express.Router();

router.get('/', (req, res, next) => {
    getAllPosts()
    .then(posts => {
        res.send(posts);
    })
    .catch(next)
})

.get('/search', (req, res, next) => {
    search(req.query.q)
    .then(posts => {
        res.send(posts);
    })
    .catch(next)
})

.get('/:id', (req, res, next) => {
    get(+req.params.id)
    .then(post => {
        if(post) {
            res.send(post);
        }
        else {
            res.status(404).send({message: 'Post not found'});
        }
    })
    .catch(next)
})

.post('/', (req, res, next) => {
    create(req.body)
    .then((post) => {
        res.send(post);
    })
    .catch(next)
})

.patch('/:id', (req, res, next) => {
    req.body.id = +req.params.id;
    update(req.body)
    .then((post) => {
        res.send(post);
    })
    .catch(next)
})

.delete('/:id', (req, res, next) => {
    remove(+req.params.id)
    .then(() => {
        res.send({message: 'Post deleted'});
    })
    .catch(next)
})

.post('/seed', (req, res, next) => {
    seed()
    .then(() => {
        res.send({message: 'Database seeded with products'});
    })
    .catch(next)
});

module.exports = router;


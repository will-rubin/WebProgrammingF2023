// @ts-check

const express = require('express');
const { getAllUsers, get, search, create, update, remove, login, seed } = require('../models/users');
const router = express.Router();

router.get('/', (req, res, next) => {
    getAllUsers()
    .then(users => {
        res.send(users);
    })
    .catch(next)
})

.get('/search', (req, res, next) => {
    const query = JSON.stringify(req.query.q)
    search(query)
    .then(users => {
        res.send(users);
    })
    .catch(next)
})  

.get('/:id', (req, res, next) => {
    get(+req.params.id)
    .then(user => {
        if(user) {
            res.send(user);
        }
        else {
            res.status(404).send({message: 'User not found'});
        }
    })
    .catch(next)
})

.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    login(email, password)
    .then((user) => {
        res.send(user);
    })
    .catch(next)
})

.post('/', (req, res, next) => {
    create(req.body)
    .then((user) => {
        res.send(user);
    })
    .catch(next)
})

.patch('/:id', (req, res, next) => {
    req.body.id = +req.params.id;
    update(req.body)
    .then((user) => {
        res.send(user);
    })
    .catch(next)
})

.delete('/:id', (req, res, next) => {
    remove(+req.params.id)
    .then(() => {
        res.send({message: 'User deleted'});
    })  
    .catch(next)
})

.post('/seed', (req, res, next) => {
    seed()
    .then(() => {
        res.send({message: 'Database seeded'});
    })
    .catch(next)
})



module.exports = router;


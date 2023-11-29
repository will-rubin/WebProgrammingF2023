// @ts-check

const express = require('express');
const { getAllUsers, get, search, create, update, remove, login } = require('../models/users');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(getAllUsers());
})

.get('/search', (req, res) => {
    const results = search((String)(req.query.q));
    res.send(results);
})  

.get('/users/:id', (req, res) => {
    const user = get(+req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send('User not found');
    }
})

.post('/', (req, res, next) => {
    const user = create(req.body);
    res.send(user);
})

.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = login(email, password);
    res.send(user);
})

.patch('/:id', (req, res, next) => {
    req.body.id = +req.params.id;
    const user = update(req.body);
    res.send(user);
})

.delete('/:id', (req, res, next) => {
    remove(+req.params.id);
    res.send({message: 'User deleted successfully'});
});

module.exports = router;


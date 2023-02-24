import express from 'express';
const router = express.Router();

import User from "../models/User.js";

router.get('/', (req, res) => {
    res.send('Hello World');
})

router.post('/register', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {

})

export default router;
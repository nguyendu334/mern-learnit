import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import tokenService from '../services/tokenService.js';

const authController = {
    checkLogin: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) return res.status(400).json({ success: false, message: 'User not found' });
            res.json({ success: true, user });
        } catch (err) {
            res.status(401).json({ success: false, message: 'User is not logged in' });
        }
    },
    register: async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        });

        try {
            const savedUser = await user.save();
            res.json({ success: true, message: 'User created successfully', user: savedUser });
        } catch (err) {
            res.status(400).send(err);
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json({ success: false, message: 'Incorrect username or password' });
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                res.status(404).json({ success: false, message: 'Incorrect username or password' });
            }
            if (user && validPassword) {
                //Generate access token
                const accessToken = tokenService.generateAccessToken(user);
                //Generate refresh token
                const refreshToken = tokenService.generateRefreshToken(user);
                //Save refresh token to database
                user.refreshToken = refreshToken;
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                });
                const { password, ...others } = user._doc;
                res.status(200).json({ success: true, ...others, accessToken });
            }
        } catch (err) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
};

export default authController;

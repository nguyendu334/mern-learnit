import Joi from 'joi';

const register = Joi.object({
    username: Joi.string().min(1).max(20).required(),
    password: Joi.string().min(6).required(),
});

const login = Joi.object({
    username: Joi.string().min(1).max(20).required(),
    password: Joi.string().min(6).required(),

});  

const post = Joi.object({
    title: Joi.string().min(1).max(20).required(),
    description: Joi.string().min(1).max(200).required(),
    url: Joi.string().min(1).max(200).required(),
});

export default {
    register,
    login,
    post
};

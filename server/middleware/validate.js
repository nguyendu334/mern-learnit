import createHttpError from 'http-errors';
import validation from '../validations/validation.js';

export default (validator) => {
    if (!validation.hasOwnProperty(validator)) throw new Error(`'${validator}' validator is not exist`);
    return async (req, res, next) => {
        try {
            const validated = await validation[validator].validateAsync(req.body);
            req.body = validated;
            next();
        } catch (err) {
            if (err.isJoi) {
                console.log(err.message)
                return next(createHttpError(422, { message: err.message }));
            }
            next(createHttpError(500));
        }
    };
};

import jwt from "jsonwebtoken";

const authMiddleware = {
    verifyToken: (req, res, next) => {
        //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
        const token = req.headers.token;
        if (token) {
            // REMOVE BEARER FROM TOKEN
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid!");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },

    verifyTokenAndUserAuthorization: (req, res, next) => {
        authMiddleware.verifyToken(req, res, () => {
            if (req.user._id === req.params._id) {
                next();
            } else {
                return res.status(403).json("You're not authorized to do this action");
            }
        });
    },
}

export default authMiddleware;
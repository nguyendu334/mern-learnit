import authRouter from './auth.js';
import postRouter from './post.js';

function route(app) {   
    app.use('/', authRouter);
    app.use('/post', postRouter);
}

export default route;
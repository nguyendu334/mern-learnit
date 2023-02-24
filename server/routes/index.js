import authRouter from './auth.js';

function route(app) {   
    app.use('/', authRouter);
}

export default route;
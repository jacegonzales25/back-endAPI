import express from 'express';
import authentication from './authentication';
import users from './users';

const router = express.Router();

export default (): express.Router => {
    // Passing in the router to the authentication function.
    authentication(router);
    users(router);
    // Returns the /auth/register route or /auth/login route
    return router; 
};
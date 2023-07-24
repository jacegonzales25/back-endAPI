import express from 'express';

import { register } from "../controllers/authentication";

export default (router: express.Router) => {
    // Having the route of register, passing the controller of register, encapsulating the whole register function
    router.post('/auth/register', register);
};
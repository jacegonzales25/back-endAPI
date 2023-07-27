import express from 'express';

import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from 'middlewares';


export default (router: express.Router) => {
    // The isAuthenticated checks if the access token is valid.
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
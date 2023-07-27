import express from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';

// Writing a controller function for the login route
export const login = async (req: express.Request, res: express.Response) => {
    try {
        // The destructured data with the body of the request
        const  { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        // The select method will select the fields with the salt and the password. Since it is salted and concatenated.
        // This also enables the access of the salt and the password in expectedHash.
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            console.log("User not found");
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        // Salter and Hasher
        const salt = random();
        // The sessionToken is the salted and hashed user id, that allows unique access to the user.
        user.authentication.sessionToken = authentication(salt, user.id.toString());

        await user.save();

        res.cookie('JACE-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'})
        
        return res.status(200).json(user).end();

    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

// Writing a controller function for the register route
export const register = async (req: express.Request, res: express.Response) => {
    try {
        // The destructured data within the body of the request can be interchanged whatever is inside the Schema and Model.
        const { email, password, username } = req.body;
        console.log(req.body);
        console.log(email, password, username);

        if (!email || !password || !username) {
            console.log("Missing required")
            return  res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }
        
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        })

        return res.status(200).json(user).end;
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
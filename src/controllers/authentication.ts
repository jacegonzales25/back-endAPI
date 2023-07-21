import express from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';

// Writing a controller function for the register route
export const register = async (req: express.Request, res: express.Response) => {
    try {
        // The destructured data within the body of the request can be interchanged whatever is inside the Schema and Model.
        const { username, email, password,  } = req.body;

        if (!email || !password || !username) {
            return console.log("Missing required"), res.sendStatus(400);
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
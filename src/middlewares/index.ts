import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from 'db/users';

// Checks if the user is the owner of the account
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { id } = req.params;
    //   Getting the identity id from the request
      const currentUserId = get(req, 'identity._id') as string;
  
      if(!currentUserId) {
        return res.sendStatus(400);
      }
  
      if(currentUserId.toString() !== id) {
        return res.sendStatus(403);
      }
  
      next();
    } catch(error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

// Authenticated middleware
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // The 'JACE-AUTH' is coded in authentication controller cookie.
        const sessionToken = req.cookies['JACE-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        // Checks if the cookie is being used currently
        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        // Next passes on the parameters to the next function or route handler.
        return next();


    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}
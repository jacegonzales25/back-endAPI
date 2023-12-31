// Helpers for authentication
import crypto from 'crypto';
import 'dotenv/config';
// const SECRET = 'JACEGONZALES'
const SECRET = process.env.SECRET;
// Random method to return a random string of characters.
export const random = () => crypto.randomBytes(128).toString('base64');

// authentication method that takes in a salt and password and returns a crypted string.
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};
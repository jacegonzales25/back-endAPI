// User Schema and User Model using Mongoose
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    // Authentication Model
    authentication: {
        // Select set to false to avoid fetching the password when fetching the user.
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false},
    }
});

// Exports the model to be used in other files.
export const UserModel = mongoose.model("User", userSchema);

// Actions for User Model that is used by Controllers

// Find a user by find models, return all users.
export const getUsers = () => UserModel.find();
// Passing in email: string to have a type for email.
export const getUserByEmail = (email: string) => UserModel.findOne({email});
// Accessing the authentication object and passing in the sessionToken. Again typed
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({"authentication.sessionToken": sessionToken,});
// Finding User by ID
export const getUserByID = (id: string) => UserModel.findById(id); 
// Creating a user and saving it to the database. This passes values to be recorded by TypeScript Record<> of userInput.
// This code creates a new UserModel returns a promise that resolves to a user object.
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
// Delete method that finds a user by ID and deletes it. It passes on an object ID
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
// Update method passing in an id with string type, and values with Record<> then updates the database.
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

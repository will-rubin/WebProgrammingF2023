
const { ObjectId, connect } = require('./mongo')
/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} fullName
 * @property {string} email
 * @property {string} password
 * @property {string} imageURL
 * @property {string} role
 * @property {Array<string>} friends
 */


const COLLECTION_NAME = 'users';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

//gets all the users
/**
 * @returns {Promise<User[]>}
 */
async function getAllUsers() {
    const col = await getCollection()
    return await col.find({}).toArray();
}

//gets a single user by its ObjectId
/**
 * @param {ObjectId} _id - The user's ID.
 * @returns {Promise<User>} - The user.
 */
async function get(_id) {
    const col = await getCollection();
    return await col.findOne({ _id: _id });
}

//search for a user
/**
 * @param {string} query - The query string.
 * @returns {Promise<User[]>} - The filtered users.
 */
async function search(query) {
    const col = await getCollection();
    const users = await col.find({
        $or: [
            { fullName: { $regex: `${query}`, $options: 'i' } },
            { email: { $regex: `${query}`, $options: 'i' } },
        ],
    }).toArray();

    return users;
}

//creates a new user
/**
 * @param {User} user - The user to be created.
 * @returns {Promise<User>} - The created user.
 */
async function create(user) {
    const users = await getAllUsers();
    const newUser = {
        ...user,
    };
    
    const col = await getCollection();
    const result = await col.insertOne(newUser);
    newUser._id = result._id;
    return newUser;
}

//updates a user
/**
 * @param {User} user - The user to be updated.
 * @returns {Promise<User>} - The updated user.
 */
async function update(user) {
    const col = await getCollection();
    const result = await col.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { returnDocument: 'after' }
    );
    return result;
}

//deletes a user
/**
 * @param {ObjectId} _id - The user's ID.
 */
async function remove(_id) {
    const col = await getCollection();
    const result = await col.deleteOne({ _id: _id });
    if(result.deletedCount === 0) {
        throw new Error(`User with id ${_id} not found`);
    }
}

//login
/**
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{ user: User, token: string}>} - The user.
 */
async function login(email, password) {
    const col = await getCollection();
    const user = await col.findOne({ email: email });
    if(user.password !== password) {
        throw new Error('Wrong password');
    }
    const token = await generateJWT(user);
    return {user, token};
}

//Seeds the database with the data from users.json
async function seed() {
    const col = await getCollection();
    await col.insertMany(data.users);
}

async function generateJWT(user) {
    return await new Promise((resolve, reject) => {
      jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } , (err, token) => {
        if(err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    })
}

async function verifyJWT(token) {
    return await new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    })
}

module.exports = {
    getAllUsers,
    get,
    search,
    create,
    update,
    remove,
    login, 
    seed,
    generateJWT,
    verifyJWT
};
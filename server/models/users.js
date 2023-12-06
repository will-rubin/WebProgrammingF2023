// @ts-check
//in sha' Allah
const { ObjectId, connect } = require('./mongo')
/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} fullName
 * @property {string} email
 * @property {string} password
 * @property {string} imageURL
 * @property {string} role
 */


const COLLECTION_NAME = 'users';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

//gets all the users
/**
 * @returns {Promise<User[]>}
 */
async function getAllUsers() {
    const col = await getCollection()
    return await col.find({}).toArray();
}

//gets a single user by its id
/**
 * @param {number} id - The user's ID.
 * @returns {Promise<User>} - The user.
 */
async function get(id) {
    const col = await getCollection();
    return await col.findOne({ id: id });
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
        { fullName: { query } },
        { email: { query } },
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
      id: users.length + 1,
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
        { id: user.id },
        { $set: user },
        { returnDocument: 'after' }
    );
    return result;
}

//deletes a user
/**
 * @param {number} id - The user's ID.
 */
async function remove(id) {
    const col = await getCollection();
    const result = await col.deleteOne({ id: id });
    if(result.deletedCount === 0) {
        throw new Error(`User with id ${id} not found`);
    }
}

//login
/**
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<User>} - The user.
 */
async function login(email, password) {
    const col = await getCollection();
    const user = await col.findOne({ email: email });
    if(user.password !== password) {
        throw new Error('Wrong password');
    }
    return user;
}

//Seeds the database with the data from users.json
async function seed() {
    const col = await getCollection();
    await col.insertMany(data.users);
}

module.exports = {
    getAllUsers,
    get,
    search,
    create,
    update,
    remove,
    login, 
    seed
};
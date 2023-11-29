// @ts-check
//in sha' Allah
/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} fullName
 * @property {string} email
 * @property {string} password
 * @property {string} imageURL
 * @property {string} role
 */

const data = require('../data/users.json');

//gets all the users
/**
 * @returns {User[]}
 */
function getAllUsers() {
  return data.users;
}

//gets a single user by its id
/**
 * @param {number} id - The user's ID.
 */
function get(id) {
    return data.users.find((user) => user.id === id);
}

//search for a user
/**
 * @param {string} query - The query string.
 * @returns {User[]} - The filtered users.
 */
function search(query) {
    return data.users.filter((user) => {
      return user.fullName.includes(query) || user.email.includes(query);
    });
}

//creates a new user
/**
 * @param {User} user - The user to be created.
 * @returns {User} - The created user.
 */
function create(user) {
    const id = data.users.length + 1;
    const newUser = {
      ...user,
      id: id,
    };
    data.users.push(newUser);
    return newUser;
}

//updates a user
/**
 * @param {User} user - The user to be updated.
 * @returns {User} - The updated user.
 */
function update(user) {
    const index = data.users.findIndex((p) => p.id === user.id);
    if(index === -1) {
        throw new Error('User not found');
    }
    data.users[index] = user;
    return user;
}

//deletes a user
/**
 * @param {number} id - The user's ID.
 */
function remove(id) {
    const index = data.users.findIndex((p) => p.id === id);
    if(index === -1) {
        throw new Error('User not found');
    }
    data.users.splice(index, 1);
}

module.exports = {
    getAllUsers,
    get,
    search,
    create,
    update,
    remove,
};
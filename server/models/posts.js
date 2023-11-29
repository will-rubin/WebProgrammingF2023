/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} timestamp
 * @property {string} location
 * @property {string} caption
 * @property {string} imageURL
 * @property {string} author
 * @property {string} fullName
 * @property {string} email
 * @property {number} distance
 * @property {number} duration
 */

const data = require('../data/posts.json');

/**
 * @returns {Post[]}
 */
function getPosts() {
  return data.posts;
}

/**
 * @param {number} id - The product's ID.
 */
function getPostById(id) {
    return data.posts.find((post) => post.id === id);
}

module.exports = {
    getPosts, 
    getPostById
};
//in sha' Allah 

const { ObjectId, connect } = require('./mongo')
/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} timestamp
 * @property {string} location
 * @property {string} caption
 * @property {string} imageURL
 * @property {string} authorEmail
 * @property {string} fullName
 * @property {string} email
 * @property {number} distance
 * @property {number} duration
 */

const data = require('../data/posts.json');

const COLLECTION_NAME = 'posts';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

//gets all the posts
/**
 * @returns {Promise<Post[]>}
 */
async function getAllPosts() {
  const col = await getCollection();
  return col.find({}).toArray();
}

//gets a single post by its id
/**
 * @param {number} id - The product's ID.
 */
function get(id) {
    return data.posts.find((post) => post.id === id);
}

//search for a post 
/**
 * @param {string} query - The query string.
 * @returns {Post[]} - The filtered posts.
 */
function search(query) {
    return data.posts.filter((post) => {
      post.caption.includes(query) || post.location.includes(query);
    });
}

//creates a new post
/**
 * @param {Post} post - The post to be created.
 * @returns {Post} - The created post.
 */
function create(post) {
    const newPost = {
      id: data.posts.length + 1,
      ...post,
    };
    data.posts.push(newPost);
    return newPost;
}

//updates a post
/**
 * @param {Post} post - The post to be updated.
 * @returns {Post} - The updated post.
 */
function update(post) {
    const index = data.posts.findIndex((p) => p.id === post.id);
    if(index === -1) {
      throw new Error('Post not found');
    }
    data.posts[index] = post;
    return data.posts[index];
}

//deletes a post
/**
 * @param {number} id - The post's ID.
 */
function remove(id) {
    const index = data.posts.findIndex((post) => post.id === id);
    if(index === -1) {
      throw new Error('Post not found');
    }
    data.posts.splice(index, 1);
}

module.exports = {
    getAllPosts, get, search, create, update, remove
};
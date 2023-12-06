//Let's not get carried away - just implement CRUD and leave the search for later.

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
  return await col.find({}).toArray();
}

//gets a single post by its id
/**
 * @param {number} id - The product's ID.
 * @returns {Promise<Post>} - The post.
 */
async function get(id) {
    const col = await getCollection();
    return await col.findOne({ id: id });
}

//search for a post 
/**
 * @param {string} query - The query string.
 * @returns {Promise<Post[]>} - The filtered posts.
 */
async function search(query) {

    const col = await getCollection();

    const posts = await col.find({
      $or: [
        { caption: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
      ],
    }).toArray();
    
    return posts;
}

//creates a new post
/**
 * @param {Post} post - The post to be created.
 * @returns {Promise<Post>} - The created post.
 */
async function create(post) {
    const posts = await getAllPosts();
    const newPost = {
      id: posts.length + 1,
      ...post,
    };
    
    const col = await getCollection();
    const result = await col.insertOne(newPost);
    newPost._id = result._id;
    return newPost;
}

//updates a post
/**
 * @param {Post} post - The post to be updated.
 * @returns {Promise<Post>} - The updated post.
 */
async function update(post) {

  const col = await getCollection();
  const result = await col.findOneAndUpdate(
    { id: post.id },
    { $set: post },
    { returnDocument: 'after' },
  );
  return result;

}

//deletes a post
/**
 * @param {number} id - The post's ID.
 */
async function remove(id) {
    const col = await getCollection();
    const result = await col.deleteOne({ id: id });
    if(result.deletedCount === 0) {
      throw new Error(`Post with id ${id} not found`);
    }
}

//Seeds the database with the data from posts.json
async function seed() {
  const col = await getCollection();
 
  await col.insertMany(data.posts);
}

module.exports = {
    getAllPosts, get, search, create, update, remove, seed
};
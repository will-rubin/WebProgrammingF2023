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

const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

//generates a new imageURL using OpenAI's Dall-e model
/**
 * @param {number} id - The product's ID.
 * @param {string} caption - The caption for the image.
 * @param {string} location - The location of the image.
 * @returns {Promise<string>} - The generated imageURL.
 */
async function generateImage(id, caption, location) {
  const prompt = `${caption} at ${location} \nImage:`;
  const gptResponse = await openai.complete({
    engine: 'davinci',
    prompt: prompt,
    maxTokens: 64,
    temperature: 0.7,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
    stop: '###',
  });
  return gptResponse.data.choices[0].text.trim();
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
  //console.log(query);
  return await col.find({caption: query}).toArray();
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
    getAllPosts, get, search, create, update, remove, seed, generateImage
};
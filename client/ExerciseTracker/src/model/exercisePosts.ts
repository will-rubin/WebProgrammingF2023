import data from '../data/exercisePosts.json'


export interface ExercisePost {
  id: number
  author: string
  timestamp: string
  location: string
  caption: string
  imageURL: string
  distance: number
  duration: number
}

const posts = data.posts.map( x => ({...x}) ) as ExercisePost[];

export function getPosts() {
  return posts;
}

export function addPost(post: ExercisePost) {
  posts.push(post);
}

export function deletePost(post: ExercisePost) {
  const index = posts.findIndex( x => x.id === post.id);
  data.posts.splice(index, 1);
}


export function editPost(post: ExercisePost, newid: number, author: string, timestamp: string, location: string, caption: string, imageURL: string, distance: number, duration: number) {
  post.id = newid;
  post.author = author;
  post.timestamp = timestamp;
  post.location = location;
  post.caption = caption;
  post.imageURL = imageURL;
  post.distance = distance;
  post.duration = duration;
}


export function getPostsByEmail(email: string): ExercisePost[] | undefined {
  let postsByEmail: ExercisePost[] = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].author === email) {
      postsByEmail.push(posts[i]);
    }
  }
  return postsByEmail;
}
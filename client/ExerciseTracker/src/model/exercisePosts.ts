import data from '../data/exercisePosts.json'


export interface ExercisePost {
  id: number
  timestamp: string
  location: string
  caption: string
  imageURL: string
  distance: number
  duration: number
  author?: string
  fname?: string
  lname?: string
}

const posts = data.posts.map( x => ({...x}) ) as ExercisePost[];

export function getPosts() {
  return posts;
}

export function addPost(id: number, timestamp: string, location: string, caption: string, imageURL: string, distance: number, duration: number, author?: string, fname?: string, lname?: string,) {
  const newPost: ExercisePost = {
    id: id,
    timestamp: timestamp,
    location: location,
    caption: caption,
    imageURL: imageURL,
    distance: distance,
    duration: duration,
    author: author,
    fname: fname,
    lname: lname
  }
  posts.push(newPost);
}

export function deletePost(post: ExercisePost) {
  const index = posts.findIndex( x => x.id === post.id);
  posts.splice(index, 1);
}


export function editPost(post: ExercisePost, timestamp: string, location: string, caption: string, imageURL: string, distance: number, duration: number) {
  post.timestamp = timestamp;
  post.location = location;
  post.caption = caption;
  post.imageURL = imageURL;
  post.distance = distance;
  post.duration = duration;
}


export function getPostsByEmail(email: string | undefined): ExercisePost[] | undefined {
  let postsByEmail: ExercisePost[] = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].author === email) {
      postsByEmail.push(posts[i]);
    }
  }
  return postsByEmail;
}
import data from '../data/exercisePosts.json'
import type { User } from './users'

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

export function getPosts() {
  return data.posts.map( x => ({...x}) ) as ExercisePost[];
}

export function addPost(post: ExercisePost) {
  data.posts.push(post);
}

export function deletePost(post: ExercisePost) {
  const index = data.posts.findIndex( x => x.id === post.id);
  data.posts.splice(index, 1);
}


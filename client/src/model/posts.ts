import { api } from "./session";

export interface Post {
  id: number
  timestamp: string
  location: string
  caption: string
  imageURL: string
  distance: number
  duration: number
  author: string
  fullName: string
}

export async function getAllPosts(): Promise<Post[]> {
  return await api("posts") as Post[];
}

export async function getPost(id: number): Promise<Post> {
  return await api(`posts/${id}`) as Post;
}

export async function createPost(post: Post): Promise<Post> {
  return await api("posts", post, "POST") as Post;
}

export async function updatePost(post: Post): Promise<Post> {
  return await api(`posts/${post.id}`, post, "PATCH") as Post;
}

export async function deletePost(id: number){
  return await api(`posts/${id}`, undefined, "DELETE");
}

export function filterPostsByUser(posts: Post[], email: string): Post[] {
  return posts.filter(post => post.author === email);
}
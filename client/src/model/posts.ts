import e from "express";
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
  return await api("posts");
}

export async function getPost(id: number): Promise<Post> {
  return await api(`posts/${id}`);
}

export async function createPost(post: Post): Promise<Post> {
  return await api("posts", post, "POST");
}

export async function updatePost(post: Post): Promise<Post> {
  return await api(`posts/${post.id}`, post, "PATCH");
}

export async function deletePost(id: number): Promise<Post> {
  return await api(`posts/${id}`, undefined, "DELETE");
}
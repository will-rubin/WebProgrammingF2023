import { api } from './session';

export interface User {
  id: number
  fullName: string
  email: string
  password: string
  role: string
  imageURL: string
}

export async function getUsers(): Promise<User[]> {
  return await api("users");
}

export async function getUser(id: number): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(u => u.id === id);
}








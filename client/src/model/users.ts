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
  return await api("users") as User[];
}

export async function getUser(id: number): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(u => u.id === id);
}

export async function createUser(user: User): Promise<User> {
  return await api("users", user, "POST") as User;
}

export async function updateUser(user: User): Promise<User> {
  return await api(`users/${user.id}`, user, "PATCH") as User;
}

export async function deleteUser(id: number) {
  return await api(`users/${id}`, undefined, "DELETE");
}

export async function login(email: string, password: string): Promise<User> {
  return await api("users/login", { email, password }, "POST") as User;
}








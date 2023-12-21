import { api } from './session';

export interface User {
  id: number
  fullName: string
  email: string
  password: string
  role: string
  imageURL: string
  friends: string[]
}

export async function getUsers(): Promise<User[]> {
  return await api("users") as User[];
}

export async function searchUsers(query: string): Promise<User[]> {
  console.log(query);
  return await api("users/search", query, "POST") as User[];
}

export async function getUser(id: number): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(u => u.id === id);
}

export async function getUserFromEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(u => u.email === email);
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

export async function getImageURLFromEmail(email: string): Promise<string> {
  const user = await getUserFromEmail(email);
  return user?.imageURL ?? "";
}









import data from '../data/users.json'

export interface User {
  id?: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: "admin" | "user"
}

export function getUsers() {
  return data.users.map( x => ({...x}) ) as User[];
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find( x => x.email === email);
}


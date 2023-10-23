import data from '../data/users.json'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  imageURL: string
}

const users = data.users.map( x => ({...x}) ) as User[];

export function getUsers() {
  return users;
}

export function addUser(user: User) {
  users.push(user);
}

export function deleteUser(user: User) {
  const index = users.findIndex( x => x.id === user.id);
  users.splice(index, 1);
}


export function editUser(user: User, newid: number, firstName: string, lastName: string, email: string, password: string, role: string, imageURL: string) {
  user.id = newid;
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = password;
  user.role = role;
  user.imageURL = imageURL;
}


export function getUserByEmail(email: string): User | undefined {
  return getUsers().find( x => x.email === email);
}




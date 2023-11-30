import { api } from './session';

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  imageURL: string
}

//Change as of 11/27/2023: We will now export a const users that is a copy of the data.users array.
//Now, when we call addUsers, we will push to the users array, and not the data.users array.
//Which will help us represent the users array in real time across the app, insha'Allah.


export function getUsers(): Promise<User[]> {
  return api("users", "");
}

export function addUser(user: User): Promise<User> {
  return api("users", JSON.stringify(user));
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




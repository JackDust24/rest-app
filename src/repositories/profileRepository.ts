import { comparePasswords, hashPassword } from '../utils/helpers';
import { User, EditUserProfile } from '../utils/types';

const users: User[] = [
  {
    id: '1e9324b9-17bc-40c5-8414-95352e665be7',
    email: 'john.doe@example.com',
    password: 'password123',
    name: 'John Doe',
    dob: new Date('1990-05-15'),
    gender: 'Male',
    address: '123 Main St, Springfield',
    isSubscribed: true,
  },
  {
    id: '2d9314c0-27bd-40d1-92f6-cdfaa89d982f',
    email: 'jane.doe@example.com',
    password: 'password456',
    name: 'Jane Doe',
    dob: new Date('1985-07-25'),
    gender: 'Female',
    address: '456 Elm St, Springfield',
    isSubscribed: false,
  },
];

const mockID = users[0].id;

const saveUser = async (user: User): Promise<void> => {
  const existingUser = users.find((u) => u.email === user.email);

  if (existingUser) {
    throw new Error('Email already taken');
  }
  users.push(user);
};

const findUserById = async (id: string): Promise<User | undefined> => {
  // NOTE - In real world, this would be a match against the id prop
  return users.find((user) => user.id === mockID);
};

const updateUser = async (
  id: string,
  updatedData: EditUserProfile
): Promise<User | null> => {
  // NOTE - In real world, this would be a match against the id prop
  const userIndex = users.findIndex((user) => user.id === mockID);
  if (userIndex === -1) return null;

  users[userIndex] = {
    ...users[userIndex],
    ...updatedData,
  };

  return users[userIndex];
};

const changeUserPassword = async (
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  // NOTE - In real world, this would be a match against the id prop
  const userIndex = users.findIndex((user) => user.id === mockID);
  if (userIndex === -1) return false;
  const hashedOldPassword = await hashPassword(users[userIndex].password);

  const isOldPasswordValid = await comparePasswords(
    oldPassword,
    hashedOldPassword
  );
  // Old password doesn't match or new password is the same as old one
  if (!isOldPasswordValid || oldPassword === newPassword) {
    return false;
  }

  const hashedNewPassword = await hashPassword(newPassword);
  users[userIndex].password = hashedNewPassword;

  return true;
};

const deleteUser = async (id: string): Promise<boolean> => {
  // NOTE - In real world, this would be a match against the id prop
  const index = users.findIndex((user) => user.id === mockID);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

export { saveUser, findUserById, updateUser, changeUserPassword, deleteUser };

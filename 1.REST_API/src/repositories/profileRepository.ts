import { mockID, users } from '../data/mockUsers';
import { comparePasswords, hashPassword } from '../utils/helpers';
import { User, EditUserProfile } from '../utils/types';

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

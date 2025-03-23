import { User, EditUserProfile } from '../utils/types';

const users: User[] = [];

const saveUser = async (user: User): Promise<void> => {
  users.push(user);
  console.log('User created:', user);
};

const findUserById = async (id: string): Promise<User | undefined> => {
  return users.find((user) => user.id === id);
};

const updateUser = async (
  id: string,
  updatedData: EditUserProfile
): Promise<User | null> => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) return null;

  users[userIndex] = {
    ...users[userIndex],
    ...updatedData,
  };
  console.log('User updated:', users[userIndex]);

  return users[userIndex];
};

const changeUserPassword = async (
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) return false;
  if (
    users[userIndex].password !== oldPassword ||
    oldPassword === newPassword
  ) {
    return false;
  }

  users[userIndex].password = newPassword;
  console.log('Password changed for user:', users[userIndex]);

  return true;
};

const deleteUser = async (id: string): Promise<boolean> => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    console.log('User deleted:', id);
    return true;
  }
  return false;
};

export { saveUser, findUserById, updateUser, changeUserPassword, deleteUser };

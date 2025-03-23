import {
  findUserById,
  saveUser,
  deleteUser,
  changeUserPassword,
  updateUser,
} from '../repositories/profileRepository';
import { User, UserProfile, EditUserProfile, Gender } from '../utils/types';

const users: User[] = [];

const registerUser = async (
  email: string,
  password: string,
  name: string,
  dob: Date,
  gender: Gender,
  address: string,
  isSubscribed: boolean
): Promise<void> => {
  const user: User = {
    id: crypto.randomUUID(),
    email,
    password,
    name,
    dob,
    gender,
    address,
    isSubscribed,
  };

  //TODO: Add user to repository
};

const getUserProfile = async (id: string): Promise<UserProfile | null> => {
  //TODO: Get user from repository and calculate age
};

const updateUserProfile = async (
  id: string,
  data: EditUserProfile
): Promise<UserProfile | null> => {
  //TODO: Update user
};

const deleteUserProfile = async (id: string): Promise<boolean> => {
  const user = await findUserById(id);
  if (!user) return false;

  await deleteUser(id);
  return true;
};

const changePassword = async (
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  return await changeUserPassword(id, oldPassword, newPassword);
};

export {
  registerUser,
  findUserById,
  updateUserProfile,
  changePassword,
  deleteUserProfile,
};

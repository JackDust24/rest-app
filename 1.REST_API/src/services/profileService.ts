import {
  findUserById,
  saveUser,
  deleteUser,
  changeUserPassword,
  updateUser,
} from '../repositories/profileRepository';
import { calculateAge, hashPassword } from '../utils/helpers';
import { User, UserProfile, EditUserProfile, Gender } from '../utils/types';

const registerUserService = async (userData: User): Promise<void> => {
  const hashedPassword = await hashPassword(userData.password);
  const user: User = {
    id: crypto.randomUUID(),
    email: userData.email,
    password: hashedPassword,
    name: userData.name,
    dob: userData.dob,
    gender: userData.gender,
    address: userData.address,
    isSubscribed: userData.isSubscribed,
  };

  await saveUser(user);
};

const getProfileService = async (id: string): Promise<UserProfile | null> => {
  const user = await findUserById(id);
  if (!user) return null;

  const userProfile: UserProfile = {
    email: user.email,
    name: user.name,
    age: calculateAge(user.dob),
    gender: user.gender,
    address: user.address,
    isSubscribed: user.isSubscribed,
  };
  return userProfile;
};

const updateProfileService = async (
  id: string,
  data: EditUserProfile
): Promise<UserProfile | null> => {
  const user = await findUserById(id);
  if (!user) return null;

  const updatedUser = { ...user, ...data };

  await updateUser(id, updatedUser);

  return {
    email: updatedUser.email,
    name: updatedUser.name,
    age: calculateAge(updatedUser.dob),
    gender: updatedUser.gender,
    address: updatedUser.address,
    isSubscribed: updatedUser.isSubscribed,
  };
};

const deleteProfileService = async (id: string): Promise<boolean> => {
  const user = await findUserById(id);
  if (!user) return false;

  await deleteUser(id);
  return true;
};

const changePasswordService = async (
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  return await changeUserPassword(id, oldPassword, newPassword);
};

export {
  registerUserService,
  getProfileService,
  updateProfileService,
  changePasswordService,
  deleteProfileService,
};

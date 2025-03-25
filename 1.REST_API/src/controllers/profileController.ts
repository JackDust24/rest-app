import { asyncCatch } from '../utils/asyncCatch';
import httpStatus from 'http-status';
import {
  registerUserService,
  getProfileService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
} from '../services/profileService';
import { User, EditUserProfile } from '../utils/types';

const registerUser = asyncCatch(async (req, res) => {
  const data: User = req.body;
  await registerUserService(data);
  try {
    await registerUserService(data);
    res
      .status(httpStatus.CREATED)
      .send({ message: 'User created successfully' });
  } catch (error) {
    if (error.message === 'Email already taken') {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: 'Email is already taken. Please use a different email.',
      });
    }
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal Server Error' });
  }
});

const getUserProfile = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const profile = await getProfileService(id);
  if (!profile) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
  }
  res.status(httpStatus.OK).json(profile);
});

const editUserProfile = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const updateData: Partial<User> = {};
  if (user.dob) updateData.dob = user.dob;
  if (user.gender) updateData.gender = user.gender;
  if (user.address) updateData.address = user.address;
  if (user.isSubscribed !== undefined)
    updateData.isSubscribed = user.isSubscribed;

  const updatedProfile = await updateProfileService(
    id,
    updateData as EditUserProfile
  );
  if (!updatedProfile) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
  }
  res
    .status(httpStatus.OK)
    .send({ message: 'User updated their profile successfully' });
});

const deleteProfile = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteProfileService(id);
  if (!result) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
  }
  res
    .status(httpStatus.OK)
    .send({ message: 'User deleted their profile successfully' });
});

const changePassword = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  const result = await changePasswordService(id, oldPassword, newPassword);
  if (!result) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: 'Unable to reset password' });
  }
  res.status(httpStatus.OK).json({ message: 'Password changed successfully' });
});

export {
  registerUser,
  getUserProfile,
  editUserProfile,
  deleteProfile,
  changePassword,
};

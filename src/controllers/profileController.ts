import { asyncCatch } from '../utils/asyncCatch';

// TODO: Just place holders for now

const registerUser = asyncCatch(async (req, res) => {
  res.json({ message: 'Register user' });
});

const getUserProfile = asyncCatch(async (req, res) => {
  res.json({ message: 'Get user profile' });
});

const editUserProfile = asyncCatch(async (req, res) => {
  res.json({ message: 'Edit user profile' });
});

const deleteProfile = asyncCatch(async (req, res) => {
  res.json({ message: 'Delete user' });
});

const changePassword = asyncCatch(async (req, res) => {
  res.json({ message: 'Change password' });
});

export {
  registerUser,
  getUserProfile,
  editUserProfile,
  deleteProfile,
  changePassword,
};

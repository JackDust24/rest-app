type Gender = 'Male' | 'Female' | 'Other';

type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  dob: Date;
  gender: Gender;
  address: string;
  isSubscribed: boolean;
};

type UserProfile = Omit<User, 'password' | 'id' | 'dob'> & { age: number };

type EditUserProfile = Pick<
  User,
  'dob' | 'gender' | 'address' | 'isSubscribed'
>;

export { Gender, User, UserProfile, EditUserProfile };

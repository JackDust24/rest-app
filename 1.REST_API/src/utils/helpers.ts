import bcrypt from 'bcrypt';

const calculateAge = (dob: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    // Adjust if birthday hasn't occurred this year yet
    age--;
  }

  return age;
};

const saltRounds = 10; // The number of rounds to use for hashing (higher is more secure, but slower)

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
};

export { calculateAge, hashPassword, comparePasswords };

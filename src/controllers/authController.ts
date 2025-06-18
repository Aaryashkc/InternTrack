import { User } from '@/models/User';
import { generateToken } from '@/lib/jwt';

export const signupController = async (userData: { name: string; email: string; password: string }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create new user
  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password
  });

  // Generate JWT token
  const token = generateToken(user._id.toString());

  // Remove password from response
  const userWithoutPassword = {
    _id: user._id,
    name: user.name,
    email: user.email
  };

  return {
    user: userWithoutPassword,
    token
  };
};

export const loginController = async (credentials: { email: string; password: string }) => {
  // Find user by email
  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(credentials.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = generateToken(user._id.toString());

  // Remove password from response
  const userWithoutPassword = {
    _id: user._id,
    name: user.name,
    email: user.email
  };

  return {
    user: userWithoutPassword,
    token
  };
}; 
'use server';
import bcrypt from 'bcrypt';

const SALT = 10;

export async function HashPassword(plainTextPassword: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(plainTextPassword, SALT);
  return hashedPassword;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<Boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

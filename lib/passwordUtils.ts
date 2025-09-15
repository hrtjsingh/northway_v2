import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10; // Recommended number of salt rounds for bcrypt

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param password The plain text password to hash.
 * @returns A promise that resolves with the hashed password string.
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
}

/**
 * Compares a plain text password with a hashed password.
 *
 * @param plainPassword The plain text password provided by the user.
 * @param hashedPassword The hashed password stored in the database.
 * @returns A promise that resolves to true if the passwords match, false otherwise.
 */
export async function validatePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error validating password:", error);
    // Depending on your error handling strategy, you might throw or return false
    throw new Error("Failed to validate password");
  }
}
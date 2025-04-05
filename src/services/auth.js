// /src/services/auth.js
import { account } from './appwrite';

export async function login(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
    console.log('Session created:', session);
    return session; // Session objesi döner (örneğin, session.$id)
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}
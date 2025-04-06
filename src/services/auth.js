
// /src/services/auth.js
import { account, ID } from './appwrite.js';

export function setupGoogleLogin() {
  const googleBtn = document.getElementById("google-login-btn");
  if (googleBtn) {
    googleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      account.createOAuth2Session(
        "google",
        "http://localhost:4321/dashboard",
        "http://localhost:4321/login"
      ).catch((error) => console.error("OAuth2 hatası:", error));
    });
  }
}


export async function login(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log('Session created:', session);
    return session; // Session objesi döner (örneğin, session.$id)
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}


export async function signUp(email, password, name) {
  try {
    console.log("Kullanıcı oluşturuluyor...");
    const user = await account.create(ID.unique(), email, password, name);
    console.log("User created:", user);

    console.log("Session oluşturuluyor...");
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created:", session);

    return { user, session };
  } catch (error) {
    console.error("SignUp failed:", error);
    throw error;
  }
}

// /src/services/auth.js
export async function getCurrentSession() {
    try {
      const session = await account.getSession('current'); // Mevcut session’ı al
      return session;
    } catch (error) {
      console.error('No active session:', error);
      return null;
    }
  }
  
  export async function isLoggedIn() {
    const session = await getCurrentSession();
    return !!session; // Session varsa true, yoksa false
  }

  
// /src/services/auth.js
export async function logout() {
    try {
      await account.deleteSession('current'); // Mevcut session’ı sil
      console.log('Session deleted');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  const authService = {
    login,
    signUp,
    getCurrentSession,
    isLoggedIn,
    logout
  };
  
  export default authService;
  
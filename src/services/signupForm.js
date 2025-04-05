import { signUp } from './auth.js'; // Eğer aynı klasörde değilse tam path ver!

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('signupForm');

  if (!form) {
    console.warn("signupForm not found");
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const { user, session } = await signUp(email, password, name);
      console.log("User created:", user);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("Signup failed:", error.message);
      alert("Kayıt başarısız: " + error.message);
    }
  });
  console.log("Form submitted");
    console.log({ name, email, password });

});

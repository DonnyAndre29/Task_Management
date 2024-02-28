// signup.js
document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Signup successful
        window.location.href = '/login';
      } else {
        // Signup failed, display error message
        document.getElementById('errorContainer').textContent = data.message;
      }
    } catch (error) {
      console.error('Signup error:', error);
      document.getElementById('errorContainer').textContent = 'An error occurred during signup.';
    }
  });
  
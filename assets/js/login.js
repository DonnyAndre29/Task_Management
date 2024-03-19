// login.js
document.getElementById('loginBtn').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Login successful, store token and redirect or update UI
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard'; // Redirect to dashboard page
      } else {
        // Login failed, display error message
        document.getElementById('errorContainer').textContent = data.message;
      }
    } catch (error) {
      console.error('Login error:', error);
      document.getElementById('errorContainer').textContent = 'An error occurred during login.';
    }
  });
  
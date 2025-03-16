// Check if the user is already logged in
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        // Redirect to /admin/ after login
        document.location.href = "/admin/";
      });
    }
  });
}

// Redirect to admin if on successful login callback 
if (document.location.hash.startsWith('#invite_token=')) {
  document.location.href = "/admin/";
} 
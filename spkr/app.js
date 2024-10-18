// Firebase configuration (replace with your Firebase config)
const firebaseConfig = {

  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Check for user session on page load
window.onload = function() {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
        console.log("User is already logged in. Redirecting to home page...");
        window.location.href = 'home.html';
    }
};

// Function to handle login form submission
function loginUser(event) {
    event.preventDefault();  // Prevent the form from submitting

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            alert("Login successful!");
            localStorage.setItem('user', JSON.stringify(user)); // Store user info in local storage

            // Redirect to the home page
            window.location.href = 'home.html';
        })
        .catch(error => {
            console.error("Error during login: ", error);
            if (error.code === 'auth/user-not-found') {
                alert("User not found! Please sign up first.");
            } else {
                alert(error.message);
            }
        });
}

// Function to handle sign up form submission
function signupUser(event) {
    event.preventDefault();  // Prevent the form from submitting

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            alert("Sign up successful!");
            localStorage.setItem('user', JSON.stringify(user)); // Store user info in local storage

            // Redirect to the home page
            window.location.href = 'home.html';
        })
        .catch(error => {
            console.error("Error during sign up: ", error);
            alert(error.message);
        });
}


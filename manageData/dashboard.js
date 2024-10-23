import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore methods
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmk9UfbIvxX68GbpK_wbTyxe_Bh9tl6c0",
    authDomain: "handicraft-marketplace-63df1.firebaseapp.com",
    projectId: "handicraft-marketplace-63df1",
    storageBucket: "handicraft-marketplace-63df1.appspot.com",
    messagingSenderId: "34989980332",
    appId: "1:34989980332:web:de98a27de1c702dafd3d09",
    measurementId: "G-2EC4QFTCM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Firestore instance
const auth = getAuth(app); // Initialize Firebase Auth

// Load user profile from Firestore
async function loadUserProfile(userId) {
    const userRef = doc(firestore, 'users', userId); // Firestore document reference

    const userSnap = await getDoc(userRef); // Fetch user data

    if (userSnap.exists()) {
        const userData = userSnap.data(); // Get user data

        // Update the DOM with user data
        document.getElementById('full-name').innerText = userData.fullName || '-not added-';
        document.getElementById('mobile-no').innerText = userData.mobileNo || '-not added-';
        document.getElementById('email-id').innerText = userData.emailId || '-not added-';
        document.getElementById('hint-name').innerText = userData.hintName || '-not added-';
        document.getElementById('alternate-mobile').innerText = userData.alternateMobile || '-not added-';
        document.getElementById('location').innerText = userData.location || '-not added-';
        document.getElementById('date-of-birth').innerText = userData.dateOfBirth || '-not added-';
        document.getElementById('gender').innerText = userData.gender || 'MALE';

        // Set input fields for editing
        document.getElementById('edit-full-name').value = userData.fullName || '';
        document.getElementById('edit-mobile-no').value = userData.mobileNo || '';
        document.getElementById('edit-email-id').value = userData.emailId || '';
        document.getElementById('edit-hint-name').value = userData.hintName || '';
        document.getElementById('edit-alternate-mobile').value = userData.alternateMobile || '';
        document.getElementById('edit-location').value = userData.location || '';
        document.getElementById('edit-date-of-birth').value = userData.dateOfBirth || '';
        document.getElementById('edit-gender').value = userData.gender || 'MALE';
    } else {
        console.log('No user data found!');
    }
}

// Auth state change listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in, show logout button and hide login/signup
        const userId = user.uid; // Get the currently signed-in user ID
        loadUserProfile(userId); // Load user profile from Firestore
        document.getElementById('imported-link').style.display = 'inline';
        document.getElementById('login-nav').style.display = 'none';
          document.getElementById('signup-nav').style.display = 'none';
          document.getElementById('extra-link').style.display = 'inline';
      } else {
          // No user is logged in, show login/signup and hide logout
          window.location.href = 'login.html'; // Redirect to login page if not logged in
          document.getElementById('imported-link').style.display = 'inline';
          document.getElementById('login-nav').style.display = 'inline';
          document.getElementById('signup-nav').style.display = 'inline';
          document.getElementById('extra-link').style.display = 'none';
      }
});

// Logout functionality
document.getElementById("logout").addEventListener("click", async function () {
    await signOut(auth);
    console.log('Sign-out successful.');
    window.location.href = './login.html'; // Redirect to login page after logout
});

// Edit Profile
function editProfile() {
    document.querySelector('.edit-button').classList.add('hidden');
    document.querySelector('.save-button').classList.remove('hidden');

    var profileItems = document.querySelectorAll('.profile-item');
    profileItems.forEach(item => {
        item.querySelector('span').classList.add('hidden');
        item.querySelector('input, select').classList.remove('hidden');
    });
}

// Save Profile
async function saveProfile() {
    const userId = auth.currentUser.uid; // Get the currently signed-in user ID
    const userRef = doc(firestore, 'users', userId); // Firestore reference

    const updatedData = {
        fullName: document.getElementById('edit-full-name').value,
        mobileNo: document.getElementById('edit-mobile-no').value,
        emailId: document.getElementById('edit-email-id').value,
        hintName: document.getElementById('edit-hint-name').value,
        alternateMobile: document.getElementById('edit-alternate-mobile').value,
        location: document.getElementById('edit-location').value,
        dateOfBirth: document.getElementById('edit-date-of-birth').value,
        gender: document.getElementById('edit-gender').value
    };

    await updateDoc(userRef, updatedData) // Update Firestore document
        .then(() => {
            alert('Profile updated successfully!');

            // Update displayed values
            for (const key in updatedData) {
                document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase()).innerText = updatedData[key] || '-not added-';
            }

            // Hide input fields and show edit button
            const inputs = document.querySelectorAll('#account-dashboard input, #account-dashboard select');
            inputs.forEach(input => {
                input.classList.add('hidden');
            });

            document.querySelector('.edit-button').classList.remove('hidden');
            document.querySelector('.save-button').classList.add('hidden');

            var profileItems = document.querySelectorAll('.profile-item');
            profileItems.forEach(item => {
                item.querySelector('span').classList.remove('hidden');
                item.querySelector('input, select').classList.add('hidden');

                var input = item.querySelector('input, select');
                var span = item.querySelector('span');
                span.textContent = input.value;
            });
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });

        document.querySelectorAll('.profile-item span').forEach(span => span.classList.remove('hidden'));
            document.querySelectorAll('.profile-item input, .profile-item select').forEach(input => input.classList.add('hidden'));
            document.querySelector('.edit-button').classList.remove('hidden');
            document.querySelector('.save-button').classList.add('hidden');
            document.querySelector('.cancel-button').classList.add('hidden');
}

// Scroll event for navbar background change
window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-bar');
    const navBar = document.querySelector('.nav-bar');
    const hasScrolled = window.scrollY > 50;

    topBar.classList.toggle('bg-none', hasScrolled);
    topBar.classList.toggle('bg-[#994200]', !hasScrolled);
    navBar.classList.toggle('shadow-xl', hasScrolled);
});

// DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.edit-button').addEventListener('click', editProfile);
    document.querySelector('.save-button').addEventListener('click', saveProfile);
});

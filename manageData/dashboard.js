import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCmk9UfbIvxX68GbpK_wbTyxe_Bh9tl6c0",
    authDomain: "handicraft-marketplace-63df1.firebaseapp.com",
    projectId: "handicraft-marketplace-63df1",
    storageBucket: "handicraft-marketplace-63df1.appspot.com",
    messagingSenderId: "34989980332",
    appId: "1:34989980332:web:de98a27de1c702dafd3d09",
    measurementId: "G-2EC4QFTCM5",
    databaseURL: "https://handicraft-marketplace-63df1-default-rtdb.firebaseio.com/" // Add your Realtime Database URL here
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);  // Initialize Firebase Auth

// Load user profile from Firebase
function loadUserProfile(userId) {
    const userRef = ref(database, 'users/' + userId);

    get(userRef).then(snapshot => {
        const userData = snapshot.val();
        if (userData) {
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
    }).catch(error => {
        console.error('Error fetching user data:', error);
    });
}

document.getElementById('logout').style.display = 'block';
document.getElementById('login-nav').style.display = 'none';
document.getElementById('signup-nav').style.display = 'none';

onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        loadUserProfile(userId);
    } else {
        window.location.href = 'login.html';
        document.getElementById('logout').style.display = 'none';
        document.getElementById('login-nav').style.display = 'block';
        document.getElementById('signup-nav').style.display = 'block';
    }
}, (error) => {
    console.error("Error checking auth state:", error);
});

document.getElementById("logout").addEventListener("click", function () {
    signOut(auth)
        .then(() => {
            console.log('Sign-out successful.');
            window.location.href = '/login.html'; // Redirect to login page after logout
        })
        .catch((error) => {
            console.error("Error during sign-out:", error);
        });
});

function editProfile() {
    document.querySelector('.edit-button').classList.add('hidden');
    document.querySelector('.save-button').classList.remove('hidden');

    var profileItems = document.querySelectorAll('.profile-item');
    profileItems.forEach(item => {
        item.querySelector('span').classList.add('hidden');
        item.querySelector('input, select').classList.remove('hidden');
    });
}

function saveProfile() {
    const userId = auth.currentUser.uid;
    const userRef = ref(database, 'users/' + userId);

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

    update(userRef, updatedData)
        .then(() => {
            alert('Profile updated successfully!');
            for (const key in updatedData) {
                const element = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase());
                if (element) {
                    element.innerText = updatedData[key] || '-not added-';
                }
            }
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



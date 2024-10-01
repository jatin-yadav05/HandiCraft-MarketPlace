// Import Firebase Admin SDK
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Initialize Firebase Admin SDK with service account
import serviceAccount from './handicraft-marketplace-63df1-firebase-adminsdk-wt3ui-3f43ac9fd7.json' assert { type: 'json' }; // Update with the correct path to your service account key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://handicraft-marketplace-63df1-default-rtdb.firebaseio.com" // Ensure this URL is correct
});

// Firestore instance
const firestore = admin.firestore();

// Read your JSON file with data
const data = JSON.parse(readFileSync('./handicraft-marketplace-63df1-default-rtdb-export.json', 'utf8')); // Update with the correct path

// Function to migrate data from Realtime Database JSON to Firestore
async function migrateUsers() {
    const users = data.users;  // Get users data

    for (const userId in users) {
        if (users.hasOwnProperty(userId)) {
            const userData = users[userId];

            // Firestore users collection
            const userDocRef = firestore.collection('users').doc(userId);

            // Set user data in Firestore
            await userDocRef.set({
                fullName: userData.fullName || '-not added-',
                emailId: userData.emailId || '-not added-',
                mobileNo: userData.mobileNo || '-not added-',
                alternateMobile: userData.alternateMobile || '-not added-',
                location: userData.location || '-not added-',
                dateOfBirth: userData.dateOfBirth || '-not added-',
                gender: userData.gender || '-not added-',
                hintName: userData.hintName || '-not added-'
            });
            
            console.log(`Migrated user: ${userId}`);
        }
    }

    console.log('Migration complete!');
}

// Run the migration
migrateUsers().catch(console.error);

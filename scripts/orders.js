import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


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
const db = getFirestore(app);

export async function addOrder(orderData) {
    try {
        const docRef = await addDoc(collection(db, "orders"), {
            ...orderData,
            timestamp: new Date().toISOString()
        });
        console.log("Order added with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding order: ", e);
        throw e;
    }
}

export async function getAllOrders() {
    try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return orders;
    } catch (e) {
        console.error("Error getting orders: ", e);
        throw e;
    }
}



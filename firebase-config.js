const firebaseConfig = {
    apiKey: "AIzaSyBujGI6fH_e0dvX9szskBh0C3t5V73svZk",
    authDomain: "theplacetoeat-e411d.firebaseapp.com",
    projectId: "theplacetoeat-e411d",
    storageBucket: "theplacetoeat-e411d.firebasestorage.app",
    messagingSenderId: "83439676891",
    appId: "1:83439676891:web:a1c918f2997b9e5398cbfe"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
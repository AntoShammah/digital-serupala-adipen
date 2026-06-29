// --- DATABASE SETUP ---
const firebaseConfig = {
  apiKey: "AIzaSyB7_8FgfLAQEvHq0rCFyY6_RL58GGNDEaU",
  authDomain: "digital-serupala-adipen.firebaseapp.com",
  databaseURL: "https://digital-serupala-adipen-default-rtdb.firebaseio.com",
  projectId: "digital-serupala-adipen",
  storageBucket: "digital-serupala-adipen.firebasestorage.app",
  messagingSenderId: "438467321425",
  appId: "1:438467321425:web:8483d9899820176b602270",
  measurementId: "G-3MFDTNNBMK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// --- DOM ELEMENTS ---
const giftBox = document.getElementById('gift-box');
const domi = document.getElementById('domi-demo');
const slipper = document.getElementById('slipper-emoji');
const headerText = document.getElementById('header-text');
const subText = document.getElementById('sub-text');
const statSent = document.getElementById('count-sent');
const statOpened = document.getElementById('count-opened');
const statShots = document.getElementById('count-shots');

// --- GLOBAL TRACKING LOGIC ---
db.ref('metrics').on('value', (snapshot) => {
    const data = snapshot.val() || { sent: 0, opened: 0, shots: 0 };
    statSent.innerText = data.sent;
    statOpened.innerText = data.opened;
    statShots.innerText = data.shots;
});

db.ref('metrics/sent').set(firebase.database.ServerValue.increment(1));

// --- ANIMATION & EVENT LOGIC ---
giftBox.addEventListener('click', () => {
    db.ref('metrics/opened').set(firebase.database.ServerValue.increment(1));
    
    giftBox.classList.add('hidden');
    domi.classList.remove('hidden');
    
    headerText.innerText = "INCOMING!";
    subText.innerText = "Domi has located the target.";

    setTimeout(() => {
        slipper.classList.remove('hidden');
        slipper.classList.add('throw-slipper');
        
        db.ref('metrics/shots').set(firebase.database.ServerValue.increment(1));

        setTimeout(() => {
            headerText.innerText = "Target Neutralized.";
            subText.innerText = "Refresh the page to deploy again.";
        }, 2500);
    }, 600); 
});

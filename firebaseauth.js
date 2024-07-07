// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvFlp7PsWTqWwR1kUmy1TRyJ8z5QakYCk",
  authDomain: "nortefactslogin.firebaseapp.com",
  projectId: "nortefactslogin",
  storageBucket: "nortefactslogin.appspot.com",
  messagingSenderId: "519413710540",
  appId: "1:519413710540:web:638766b0a8ea0991990c69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function() {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = 'login.html';
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email address Already Exists !!', 'signUpMessage');
      } else {
        showMessage('Unable to create User', 'signUpMessage');
      }
    });
});

/* sign in */

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click' , (event)=>{
  event.preventDefault();
  const email=document.getElementById('email').value;
  const password=document.getElementById('password').value;
  const auth=getAuth();

  signInWithEmailAndPassword(auth, email,password)
  .then((userCredential)=>{
    showMessage('login Successfull', 'signInMessage');
    const user=userCredential.user;
    localStorage.setItem('loggedInUserId', user.uid);
    window.location.href='index.html';
  })
  .catch((error)=>{
    const errorCode=error.code;
    if(errorCode==='auth/invalid-credential'){
      showMessage('Incorrect Email or Password', 'singInMessage');
    }
    else{
      showMessage('Account does not Exist', 'signInMessage')
    }
  })
})
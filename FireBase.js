// firebase.js
// تحميل Firebase عبر script في HTML
// أو إذا أردت يمكنك تحميله داخل هذا الملف نفسه

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBoKD-3ik3zEL2rXj7NRFmzg6lSdF3JX6g",
  authDomain: "tebelbosataa.firebaseapp.com",
  databaseURL: "https://tebelbosataa-default-rtdb.firebaseio.com",
  projectId: "tebelbosataa",
};

// التحقق إذا لم يكن Firebase مُهيأ مسبقاً
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// تعريف db عالمياً
const db = firebase.database();
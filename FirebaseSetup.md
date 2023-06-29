# If you pick a template with Firebase setup, you must follow these steps to set up Firebase from its console.

## 1 - Add a project

Go to [Firebase Console](https://console.firebase.google.com/) and add a project.

---

## 2 - Enable web app

Enable the web app from the top of the Firebase dashboard.

---

## 3 - Copy `firebaseConfig`

After giving your web app a nickname, copy the `firebaseConfig` object and paste it in the `firebase.config.js` file in the template.

---

## 4 - Enable Cloud Firestore

Open the sidebar and navigate to the `Build` category, then enable Firestore Database.

---

## 5 - Enable Authentication

Follow the same steps as enabling Cloud Firestore to enable Authentication.

---

## 6 - Enable Google provider

In the `Sign-in method` section, add the Google provider.

---

## 7 - Copy domain

Go to your app directory and run `npm start`, then copy the domain that Vite gives you.

---

## 8 - Add app domain

Go to Firebase Authentication and navigate to the `Settings` section. In the `Authorized domains`, add the app domain.

And you should be good to go! Enjoy (:

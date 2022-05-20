console.log("Firebase fired!");

let allTrees; // Contains all Trees
let allUsers; // Contains all Trees
// let rotoli_usati; // Contains all Trees
let updateStrappi; //  add a msg to the DB

// Load and initialize Firebase
async function firebaseSetup() {
  // load firebase modules using import("url")
  const fb_app = "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
  const fb_database =
    "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

  // Load the libraries
  const { initializeApp } = await import(fb_app);
  console.log("initializeApp:", initializeApp);
  const { getDatabase, ref, push, set, update, onValue } = await import(
    fb_database
  );

  // Your web app's Firebase configuration
  // You can get this information from the firebase console
  const firebaseConfig = {
    apiKey: "AIzaSyCc5zNUGU3WbiU37F2jFlcaWAP-Z_tqKZ0",
    authDomain: "mor-tree-database.firebaseapp.com",
    projectId: "mor-tree-database",
    storageBucket: "mor-tree-database.appspot.com",
    messagingSenderId: "515733813854",
    appId: "1:515733813854:web:1ccc8d97f0d8511ac692cf",
    databaseURL:
      "https://mor-tree-database-default-rtdb.europe-west1.firebasedatabase.app/",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  console.log("app:", app);
  // Initialize Database
  const myDatabase = getDatabase(app);

  //Reference to a specific property of the database
  const trees_ref = ref(myDatabase, "trees");
  console.log("greetings_ref:", trees_ref);
  const user_ref = ref(myDatabase, "user");
  const usati_ref = ref(myDatabase, "user/rotoli_usati");

  //  Function to retrieve the greetings
  //  onValue(ref, function) monitors a ref
  //  Snapshot value of the ref in that moment
  onValue(trees_ref, (snapshot) => {
    allTrees = snapshot.val();
    console.log("allTrees:", allTrees);
  });
  onValue(user_ref, (snapshot) => {
    allUsers = snapshot.val();
    console.log("allTrees:", allUsers);
  });
  // onValue(usati_ref, (snapshot) => {
  //   rotoli_usati = snapshot.val();
  // });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 5000);
  });
}

firebaseSetup();

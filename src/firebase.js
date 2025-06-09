 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/firebase.js b/src/firebase.js
index 34447b40b043145d268793e6cb22ce3a9f86042f..19f9b04f1798bcbdd00dd38f31ee8db856e6d274 100644
--- a/src/firebase.js
+++ b/src/firebase.js
@@ -1,17 +1,20 @@
 
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
+import { getAuth } from "firebase/auth";
 
 const firebaseConfig = {
   apiKey: "AIzaSyBmKazNVKE4dEF7bkEsbBAYhRTQp94x4fo",
   authDomain: "team-calendar-6396c.firebaseapp.com",
   projectId: "team-calendar-6396c",
   storageBucket: "team-calendar-6396c",
   messagingSenderId: "258023333622",
   appId: "1:258023333622:web:90c98ec2cb49d0723f96d7",
   measurementId: "G-GXMSRX3CXT"
 };
 
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
-export { db };
+const auth = getAuth(app);
+
+export { db, auth };
 
EOF
)

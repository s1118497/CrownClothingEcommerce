import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBkBXURuNh-tHgvjSp6KHBjK8yIsS0ZEzc",
	authDomain: "crown-clothing-db-b7438.firebaseapp.com",
	projectId: "crown-clothing-db-b7438",
	storageBucket: "crown-clothing-db-b7438.appspot.com",
	messagingSenderId: "298130516691",
	appId: "1:298130516691:web:0bce2cc2f425f9c36b0226",
};

/* https://firebase.google.com/docs/web/setup#create-firebase-project-and-app */
//  Initialize Firebase, connect my web app to my Firebase project database,
const firebaseApp = initializeApp(firebaseConfig);

/* https://firebase.google.com/docs/auth/web/google-signin |  */
// Create an instance of the Google provider object:
const provider = new GoogleAuthProvider();
// Optional: Specify additional custom OAuth provider parameters that you want to send with the OAuth request.
provider.setCustomParameters({ prompt: "select_account" });

// export auth instance, getAuth(firebaseApp) by default - https://stackoverflow.com/questions/72574943/are-you-supposed-to-pass-the-firebase-app-to-getauth-or-leave-the-arguments-as
export const auth = getAuth();
// export google signInWithPopup api, return a promise
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

/* https://firebase.google.com/docs/firestore/manage-data/add-data#initialize */
// Initialize an instance of Cloud Firestore:
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
	// doc(firestore, path/collection name, pathSegments): DocumentReference - https://firebase.google.com/docs/reference/js/firestore_.md#doc
	// 		Here pathSegments refer to userAuth.id, as an unique id to get the document,
	//			so path to that particular document will be "users/{uid}"
	// *note*
	// 	A DocumentRefernce obj always present when using doc(), even it is not yet created in firebase database
	const userDocRef = doc(db, "users", userAuth.uid);

	// getDoc(DocumentReference): Promise<DocumentSnapshot>
	// *note*
	//	A DocumentSnapshot contains data read from a document specified by the DocumentReference.
	//		can use exists() method to check whether the data/document actually exists
	const userSnapshot = await getDoc(userDocRef);
	console.log(
		'user "' + userAuth.displayName + '" record exist in database? ==> ' + userSnapshot.exists()
	);

	//#region : pseudo code -- sign in user logic
	/* 
		if (user data exist) {
			return userDocRef
		}
		if (user data doesn't exist){
			create the document with input data, userAuth, in my collection
		}
	 */
	//#endregion

	if (!userSnapshot.exists()) {
		try {
			// setDoc(DocumentReference, data): Promise<void>;
			// 	if no data exist in the DocRef, creat data into it
			await setDoc(userDocRef, {
				user: userAuth.displayName,
				email: userAuth.email,
				createdAt: new Date(),
			});
		} catch (error) {
			alert("error creating the user:", error.message);
		}
	}

	// always return the DocumentReference to client for CRUD operation
	// *note*
	// return type is a Promise<userDocRef> because of async function
	return userDocRef;
};

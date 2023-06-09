import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	writeBatch,
	doc,
	setDoc,
	getDoc,
	query,
	getDocs,
	QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

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
// 	*note*
//  	you can have different provider instance, e.g. facebook auth provider
const googleProvider = new GoogleAuthProvider();
// Optional: Specify additional custom OAuth provider parameters that you want to send with the OAuth request.
googleProvider.setCustomParameters({ prompt: "select_account" });

// export auth instance, getAuth(firebaseApp) by default - https://stackoverflow.com/questions/72574943/are-you-supposed-to-pass-the-firebase-app-to-getauth-or-leave-the-arguments-as
// 	*IMPORTANT*
//		(Singleton)An auth instance act as unique store throughout the entire app
//						-keep track of whether user sign-in/out with different sign in provider
export const auth = getAuth();

// export google signInWithPopup & signInWithRedirect api, return a Promise<UserCredential>
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

/* https://firebase.google.com/docs/firestore/manage-data/add-data#initialize */
// Initialize an instance of Cloud Firestore:
export const db = getFirestore();

export type ObjectToAdd = { title: string };

// (demo only) one-time used, just to show how to create a new collection and batch write documents in it.
export const addCollectionAndDocument = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	// collection(firestore, path/collection name, [pathSegments]): CollectionReference
	// 	*note*
	// 		a CollectionReference obj always present when using collection(), even it is not yet created in firebase database
	const collectionRef = collection(db, collectionKey);

	//  a write batch, means multiple writes as a single atomic operation (must be performed entirely or not performed at all)
	//  	https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes
	// get a new write batch instance, any combination of writes operation, set(), update(), or delete()
	const batch = writeBatch(db);

	// objectsToAdd argument = SHOP_DATA from "shop-data.js"
	objectsToAdd.forEach((object: any) => {
		// for each SHOP_DATA element, get an document reference named as its title prop
		// 		doc(db, collection, document) | doc(collection, document)
		const docRef = doc(collectionRef, object.title.toLowerCase());
		// write the data to the document
		batch.set(docRef, object);
	});

	// commits all of the writes in this write batch as a single transaction
	// 	here means all the batch.set(docRef, object)
	await batch.commit();

	console.log("done - write batch");
};

// https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	//  create a reference to the "categories" collection -  https://firebase.google.com/docs/firestore/query-data/queries#simple_queries
	const collectionRef = collection(db, "categories");
	// create a query against the collection.
	const q = query(collectionRef);
	// executes the query and returns the results as a QuerySnapshot:  https://firebase.google.com/docs/reference/js/firestore_.md#getdocs
	// 		getDocs<T>(query: Query<T>): Promise<QuerySnapshot<T>>
	// *note*
	// 		querySnapshot.docs = an array of each the document against the collection QuerySnapshot.
	// 				each docSnapshot need data() to decrypt the document data
	const querySnapshot = await getDocs(q);
	const categoriesArray = querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);

	// 159: Business Logic in our Selectors
	// 		return the base form of firestore document
	return categoriesArray;

	// *notes*
	// format the each document data [ {title: "hat", items: [xxx, xxx, xxx]} , {title: "jackets", items: [xxx, xxx, xxx]} ]
	// 		into one categoryMap { hat: [xxx, xxx, xxx], jackets: [xxx, xxx, xxx] }
	// 		 reason: Objects (Hash Table data structure) better for searching O[1] for items than Array O[N].
	/* // (deprecated) at 159: Business Logic in our Selectors
		const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data?.();
		acc[title.toLowerCase()] = items;
		return acc;
		}, {}); 
		return categoryMap; */
};

export type AdditionalInfo = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
	id?: string;
};

export const createUserDocFromAuth = async (
	userAuth: User,
	additionalInfo = {} as AdditionalInfo
): Promise<QueryDocumentSnapshot<UserData>> => {
	// doc(firestore, path/collection name, pathSegments/document name) || doc(collectionRef, pathSegments/document name): DocumentReference
	// 		Here pathSegments refer to userAuth.id, as an unique id to get the document,
	//			so path to that particular document will be "users/{uid}"
	// 	*note*
	// 		A DocumentRefernce obj always present when using doc(), even it is not yet created in firebase database
	const userDocRef = doc(db, "users", userAuth.uid);

	// getDoc(DocumentReference): Promise<DocumentSnapshot<T>>
	// 	*note*
	//		A DocumentSnapshot contains data read from a document specified by the DocumentReference.
	//			can use exists() method to check whether the data/document actually exists
	const userSnapshot = await getDoc(userDocRef);

	//#region : pseudo code -- sign in user & return user document Logic
	/* 
		if (user data exist) {
			return userDocRef
		}
		if (user data doesn't exist){
			create the document with input data, userAuth, in my collection
		}
	 */
	//#endregion

	// 	if no data exist in the Doc, create data into it
	if (!userSnapshot.exists()) {
		try {
			//  for the first time of email&password sign-up, additionalInfo parameter = {displayName: xxx}, and create the related user document
			await setDoc(userDocRef, {
				displayName: userAuth.displayName,
				email: userAuth.email,
				createdAt: new Date(),
				...additionalInfo,
			});
		} catch (error) {
			alert("error creating user:" + (error as Error).message);
		}
	}
	// at this statement, userSnapshot must exist, so type assertion can narrow down to <QueryDocumentSnapshot>
	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	// if either email or password missing, return immediately
	if (!email || !password) return;
	const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	return userCredential.user;
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	// if either email or password missing, return immediately
	if (!email || !password) return;
	const userCredential = await signInWithEmailAndPassword(auth, email, password);
	return userCredential.user;
};

export const signOutUser = async () => {
	try {
		await signOut(auth);
	} catch (error: any) {
		alert("Sign Out Error: " + error.code);
	}
};

// // no needed after migrate logic to redux-saga
// // *  a helper function as an observer for changes to user's sign-in state in auth object *
// export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// migrate to Promise-based, one-time check function to check if a user sign-in or not, then unsubscribe,
// 		return a Promise of resolved value of user<User|null>
//	 signature: onAuthStateChanged(auth: Auth, NextOrObserver<User> [, ErrorFn,  CompleteFn]): Unsubscribe;
export const getCurrentUser = (): Promise<User | null> =>
	new Promise((resolve, reject) => {
		// onAuthStateChanged() is sync, unsubscribe is already return, so the async listener callback (2nd arg) can access it
		const unsubscribe = onAuthStateChanged(
			auth,
			// the observer is triggered on sign-in (user:User) or sign-out (user:null)
			(user) => {
				// unsubscribe the listener once get the user value - one-time check
				unsubscribe();
				resolve(user);
			},
			// if error, return rejected Promise
			reject
		);
	});

// import { GoogleAuthProvider } from "firebase/auth";
import { createUserDocFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	const logGoogleUser = async () => {
		// const userCredential = GoogleAuthProvider.credentialFromResult(response);
		// console.log(userCredential.accessToken);
		const response = await signInWithGooglePopup();
		console.log(response);
		const userDocRef = await createUserDocFromAuth(response.user);
		console.log(userDocRef);
	};

	return (
		<div>
			<h1>SignIn</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
		</div>
	);
};

export default SignIn;

import {
	createUserDocFromAuth,
	signInWithGooglePopup,
	signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";
import { useRef } from "react";

const SignIn = () => {
	const logGoogleUser = async (e) => {
		e.preventDefault();
		// const userCredential = GoogleAuthProvider.credentialFromResult(response);
		// console.log(userCredential.accessToken);
		const response = await signInWithGooglePopup();
		console.log(response);
		const userDocRef = await createUserDocFromAuth(response.user);
		console.log(userDocRef);
	};

	const logEmailPasswordUser = async (e) => {
		e.preventDefault();
		const { value: emailValue } = input_email.current;
		const { value: passwordValue } = input_password.current;
		try {
			const loggedUser = await signInUserWithEmailAndPassword(emailValue, passwordValue);
			const userDoc = await createUserDocFromAuth(loggedUser);
			console.log(userDoc);
			input_email.current.value = "";
			input_password.current.value = "";
		} catch (error) {
			alert("log in failed: " + error.code);
			input_email.current.value = "";
			input_password.current.value = "";
		}
	};

	const input_email = useRef("");
	const input_password = useRef("");

	return (
		<div>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form>
				<label>email</label>
				<input type="email" ref={input_email} />
				<label>password</label>
				<input type="password" ref={input_password} />
				<Button onClick={logEmailPasswordUser}>Sign in</Button>
				<Button btnType="google" onClick={logGoogleUser}>
					Sign in with Google
				</Button>
			</form>
			<SignUpForm />
		</div>
	);
};

export default SignIn;

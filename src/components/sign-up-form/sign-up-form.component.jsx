import { useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleInpChange = (e) => {
		const { name, value } = e.currentTarget;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// first check confirmPassword match with password
		if (confirmPassword !== password) return alert("confirm password do not match!");

		try {
			const userCredential = await createAuthUserWithEmailAndPassword(email, password);
			// 	email & password auth doesn't provide display name like Google auth does.
			// 		createUserDocFromAuth (Object<userAuth>, Object<additionalInfo>) : Promise <userDocRef>
			const userDocRef = await createUserDocFromAuth(userCredential.user, { displayName });
			console.log(userDocRef);

			setFormFields(defaultFormFields);
		} catch (err) {
			if (err.code === "auth/email-already-in-use")
				alert("Fail to create user: Already signed in");
		}
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account? </h2>
			<span>Sign up with your email & password </span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					name="displayName"
					value={displayName}
					type="text"
					required
					onChange={handleInpChange}
				/>
				<FormInput
					label="Email"
					name="email"
					value={email}
					type="email"
					required
					onChange={handleInpChange}
				/>
				<FormInput
					label="Password"
					name="password"
					value={password}
					type="password"
					required
					onChange={handleInpChange}
				/>
				<FormInput
					label="Confirm password"
					name="confirmPassword"
					value={confirmPassword}
					type="password"
					required
					onChange={handleInpChange}
				/>
				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;

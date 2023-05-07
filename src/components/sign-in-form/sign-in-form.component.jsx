import { useState } from "react";
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action.js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(emailSignInStart(email, password));
		} catch (error) {
			switch (error.code) {
				case "auth/invalid-email":
					return alert("Login Fail: Invalid-Email");
				case "auth/user-not-found":
					return alert("Login Fail: User not found");
				case "auth/wrong-password":
					return alert("Wrong Password");
				default:
					return;
			}
		} finally {
			setFormFields(defaultFormFields);
		}
	};

	const signInWithGoogle = async (e) => {
		try {
			dispatch(googleSignInStart());
		} catch (error) {
			if (error.code === "auth/popup-closed-by-user") return alert("Please log in account");
			return alert(error.code);
		}
	};

	const handleInpChange = (e) => {
		const { name, value } = e.currentTarget;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignInContainer>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="email"
					value={email}
					name="email"
					required
					onChange={handleInpChange}
				/>
				<FormInput
					label="password"
					value={password}
					name="password"
					type="password"
					required
					onChange={handleInpChange}
				/>
				<ButtonsContainer>
					<Button type="submit">Sign In</Button>
					{/*  all button inside <form> are type=submit by default */}
					<Button
						btnType={BUTTON_TYPE_CLASSES.google}
						type="button"
						onClick={signInWithGoogle}>
						Sign in with Google
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;

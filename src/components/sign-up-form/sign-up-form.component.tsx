import { ChangeEvent, FormEvent, useCallback, useState } from "react";

import { useDispatch } from "react-redux";

import { AuthError, AuthErrorCodes } from "firebase/auth";

import { signUpStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const dispatch = useDispatch();

	const handleInpChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// first check confirmPassword match with password
		if (confirmPassword !== password) return alert("confirm password do not match!");
		try {
			dispatch(signUpStart({ email, password, displayName }));
		} catch (err) {
			if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS)
				return alert("Fail to create user: Already signed in");
			return alert((err as AuthError).code);
		} finally {
			setFormFields(defaultFormFields);
		}
		// 	no dependency require, dispatch supposed to remain the same
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<SignUpContainer>
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
		</SignUpContainer>
	);
};

export default SignUpForm;

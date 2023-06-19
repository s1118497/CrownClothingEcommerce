import { FC, InputHTMLAttributes } from "react";
import { FormInputLabel, Input, Group } from "./form-input.styles.jsx";

type FormInputProps = {
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
	return (
		<Group>
			<Input {...otherProps} />
			{/* type safe:
					check otherProps existence &&
					check otherProps.value is a string (input value can be string and number)
						then length property is sure to exist.
			*/}
			<FormInputLabel
				shrink={Boolean(
					otherProps.value &&
						typeof otherProps.value === "string" &&
						otherProps.value.length
				)}>
				{label}
			</FormInputLabel>
		</Group>
	);
};

export default FormInput;

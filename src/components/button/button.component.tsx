import { FC, ButtonHTMLAttributes } from "react";
import { BaseButton, GoogleButton, InvertedButton, ButtonSpinner } from "./button.styles";

// Workaround of enum type, can accept both key & string literal type,
//		Const Assertion:  https://www.youtube.com/watch?v=pWPClHdcvVg
export const BUTTON_TYPE_CLASSES = {
	base: "base",
	google: "google-sign-in",
	inverted: "inverted",
} as const;
type ButtonTypes = (typeof BUTTON_TYPE_CLASSES)[keyof typeof BUTTON_TYPE_CLASSES];
//#endregion

// return one of three styled button components from map, default = <BaseButton>
const getButton = (btnType: ButtonTypes = "base") =>
	({
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.google]: GoogleButton,
		[BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
	}[btnType]);

export type ButtonProps = {
	btnType?: ButtonTypes;
	isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// //  ------------function declaration version,
// // 	cannot leverage FC<T>, which cannot
// // 	1) access to pre-typed props, like children
// // 	2) return value-Button is not explicity typed, only inferred by complier as JSX.Elemet
// function Button({ children, btnType, isLoading, ...otherProps }: ButtonProps) {
// 	const CustomButton = getButton(btnType);
// 	return (
// 		<CustomButton disabled={isLoading} {...otherProps}>
// 			{isLoading ? <ButtonSpinner /> : children}
// 		</CustomButton>
// 	);
// }

const Button: FC<ButtonProps> = ({ children, btnType, isLoading, ...otherProps }) => {
	const CustomButton = getButton(btnType);
	return (
		<CustomButton disabled={isLoading} {...otherProps}>
			{isLoading ? <ButtonSpinner /> : children}
		</CustomButton>
	);
};

export default Button;

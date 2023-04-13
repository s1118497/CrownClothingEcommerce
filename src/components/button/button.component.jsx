import { BaseButton, GoogleButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
	base: "base",
	google: "google-sign-in",
	inverted: "inverted",
};

// return one of three styled button components from map, default = <BaseButton>
const getButton = (btnType = BUTTON_TYPE_CLASSES.base) =>
	({
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.google]: GoogleButton,
		[BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
	}[btnType]);

export default function Button({ children, btnType, ...otherProps }) {
	const CustomButton = getButton(btnType);
	return <CustomButton {...otherProps}>{children}</CustomButton>;
}

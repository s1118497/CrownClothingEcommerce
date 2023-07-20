import { render, screen, cleanup } from "@testing-library/react";
import Button from "../button.component";
import { BUTTON_TYPE_CLASSES } from "../button.component";

describe("button tests", () => {
	test("should render BaseButton when no props passed", () => {
		// // query html node element by node text
		// render(<Button>Test</Button>);
		// const buttonElement = screen.getByText(/test/i);

		//  (preferred) query element by role that is exposed in the accessibility tree.
		render(<Button />);
		const buttonElement = screen.getByRole("button");

		// assertion
		expect(buttonElement).toHaveStyle(`background-color: black`);
	});

	test("should render GoogleButton when googles props passed", () => {
		render(<Button btnType="google-sign-in" />);
		const buttonElement1 = screen.getByRole("button");
		expect(buttonElement1).toHaveStyle(`background-color: #4285f4`);
		cleanup();
		render(<Button btnType={BUTTON_TYPE_CLASSES.google} />);
		const buttonElement2 = screen.getByRole("button");
		expect(buttonElement2).toHaveStyle(`background-color: #4285f4`);
	});

	test("should render InvertedButton when inverted props passed", () => {
		render(<Button btnType="inverted" />);
		const buttonElement1 = screen.getByRole("button");
		expect(buttonElement1).toHaveStyle(`background-color: white`);
		cleanup();
		render(<Button btnType={BUTTON_TYPE_CLASSES.inverted} />);
		const buttonElement2 = screen.getByRole("button");
		expect(buttonElement2).toHaveStyle(`background-color: white`);
	});

	test("should disable when isLoading is true", () => {
		render(<Button isLoading={true} />);
		const buttonElement = screen.getByRole("button");
		expect(buttonElement).toBeDisabled();
	});
});

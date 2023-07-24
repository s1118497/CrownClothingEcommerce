import { screen, fireEvent } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/test.utils";
import Navigation from "../navigation.component";
import { signOutStart } from "../../../store/user/user.action";

// mock entire "react-redux" module & spy on the useDispatch hook which return mock dispatch function
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useDispatch: () => mockDispatch,
}));

describe("Navigation tests", () => {
	test("It should render ONLY the Sign-in link if no current user", () => {
		renderWithProviders(<Navigation />, {
			preloadedState: { user: { currentUser: null } },
		});
		const SignOutLinkElement = screen.queryByText(/sign out/i);
		expect(SignOutLinkElement).toBeNull();
		const SignInLinkElement = screen.getByText(/sign in/i);
		expect(SignInLinkElement).toBeInTheDocument();
	});

	test("It should render ONLY the Sign-out link if a current user present", () => {
		renderWithProviders(<Navigation />, {
			preloadedState: {
				user: {
					currentUser: {},
				},
			},
		});
		const SignOutLinkElement = screen.getByText(/sign out/i);
		expect(SignOutLinkElement).toBeInTheDocument();
		const SignInLinkElement = screen.queryByText(/sign in/i);
		expect(SignInLinkElement).toBeNull();
	});

	test("It should render cart dropdown if isCartOpen is true", () => {
		renderWithProviders(<Navigation />, {
			preloadedState: { cart: { isCartOpen: true, cartItems: [] } },
		});
		const GoToCheckoutBtnElement = screen.getByText(/go to checkout/i);
		expect(GoToCheckoutBtnElement).toBeInTheDocument();
		const EmptyMessageElement = screen.queryByText(/Your cart is empty/i);
		expect(EmptyMessageElement).toBeInTheDocument();
	});

	test("It should not render cart dropdown if isCartOpen is false", () => {
		renderWithProviders(<Navigation />, {
			preloadedState: { cart: { isCartOpen: false, cartItems: [] } },
		});
		const GoToCheckoutBtnElement = screen.queryByText(/go to checkout/i);
		expect(GoToCheckoutBtnElement).toBeNull();
		const EmptyMessageElement = screen.queryByText(/Your cart is empty/i);
		expect(EmptyMessageElement).toBeNull();
	});

	it("should dispatch signOutStart action when clicking on the Sign Out link", () => {
		renderWithProviders(<Navigation />, {
			preloadedState: {
				user: { currentUser: {} },
			},
		});

		const SignOutLinkElement = screen.getByText(/sign out/i);
		expect(SignOutLinkElement).toBeInTheDocument();

		fireEvent.click(SignOutLinkElement);
		expect(mockDispatch).toBeCalledTimes(1);

		const SignOutStartAction = signOutStart();
		expect(mockDispatch).toBeCalledWith(SignOutStartAction);

		// console.log(mockDispatch.mock.calls); // [ [ SignOutStartAction ] ]
		mockDispatch.mockClear();
		// console.log(mockDispatch.mock.calls); // []
	});
});

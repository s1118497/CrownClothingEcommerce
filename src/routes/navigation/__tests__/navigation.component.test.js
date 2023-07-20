import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import Navigation from "../navigation.component";

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
});

import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signOutStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation = () => {
	const dispatch = useDispatch();

	//  useSelector automatically subscribes to the Redux store for us!
	// 		rerender whenever selector return value changes
	const currentUser = useSelector(selectCurrentUser);

	const isCartOpen = useSelector(selectIsCartOpen);

	const handleSignOut = () => dispatch(signOutStart());

	return (
		<>
			<NavigationContainer>
				<LogoContainer to="/">
					<Logo />
				</LogoContainer>
				<NavLinks>
					<NavLink to="shop">Shop</NavLink>
					<NavLink>Contact</NavLink>
					{currentUser ? (
						// render the styled component as <span> tag
						<NavLink as="span" onClick={handleSignOut}>
							Sign Out
						</NavLink>
					) : (
						<NavLink to="auth">Sign In</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;

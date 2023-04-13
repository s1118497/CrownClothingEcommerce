import { Outlet } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useUserContext } from "../../contexts/user.context";
import { useCartContext } from "../../contexts/cart.context";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation = () => {
	const { currentUser } = useUserContext();

	const { isCartOpen } = useCartContext();

	const handleSignOut = async (e) => await signOutUser();

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

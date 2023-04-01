import { Outlet, Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useUserContext } from "../../contexts/user.context";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import "./navigation.styles.scss";
import { useCartContext } from "../../contexts/cart.context";

const Navigation = () => {
	const { currentUser } = useUserContext();

	const {
		cart: { isCartOpen },
	} = useCartContext();

	const handleSignOut = async (e) => await signOutUser();

	return (
		<>
			<div className="navigation">
				<Link to="/" className="logo-container">
					<Logo className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="shop">
						Shop
					</Link>
					<Link className="nav-link">Contact</Link>
					{currentUser ? (
						<span className="nav-link no-shrink" onClick={handleSignOut}>
							Sign Out
						</span>
					) : (
						<Link className="nav-link no-shrink" to="auth">
							Sign In
						</Link>
					)}
					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;

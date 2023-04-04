import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate("/checkout");
		setIsCartOpen(false);
	};

	const { cartItems, setIsCartOpen } = useCartContext();

	return (
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</div>
			<Button onClick={goToCheckoutHandler}>go to checkout</Button>
		</div>
	);
};

export default CartDropdown;

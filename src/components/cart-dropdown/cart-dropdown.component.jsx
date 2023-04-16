import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropDownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate("/checkout");
		setIsCartOpen(false);
	};

	const { cartItems, setIsCartOpen, cartCount } = useCartContext();

	return (
		<CartDropDownContainer>
			<CartItems>
				{cartCount ? (
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>go to checkout</Button>
		</CartDropDownContainer>
	);
};

export default CartDropdown;

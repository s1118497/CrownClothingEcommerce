import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropDownContainer, CartItems } from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate("/checkout");
		setIsCartOpen(false);
	};

	const { cartItems, setIsCartOpen } = useCartContext();

	return (
		<CartDropDownContainer>
			<CartItems>
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>go to checkout</Button>
		</CartDropDownContainer>
	);
};

export default CartDropdown;

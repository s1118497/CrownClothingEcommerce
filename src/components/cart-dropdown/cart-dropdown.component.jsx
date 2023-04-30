import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartCount, selectCartItems } from "../../store/cart/cart.selector";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropDownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goToCheckoutHandler = () => {
		navigate("/checkout");
		dispatch(setIsCartOpen(false));
	};

	const cartItems = useSelector(selectCartItems);
	const cartCount = useSelector(selectCartCount);

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

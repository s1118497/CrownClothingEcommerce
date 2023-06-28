import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartCount, selectCartItems } from "../../store/cart/cart.selector";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropDownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles";

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);
	const cartCount = useSelector(selectCartCount);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goToCheckoutHandler = useCallback(() => {
		navigate("/checkout");
		dispatch(setIsCartOpen(false));
		// dispatch and navigate function reference suppose not to change as 3rd party hook, so not nessessary to include dependency
	}, []);

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

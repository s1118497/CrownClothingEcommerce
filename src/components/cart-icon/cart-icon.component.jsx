import { useCartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
	const { setIsCartOpen, isCartOpen, cartCount } = useCartContext();
	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useCartContext } from "../../contexts/cart.context";
import "./cart-icon.styles.scss";

const CartIcon = () => {
	const { cart, setCart } = useCartContext();
	const toggleIsCartOpen = () => setCart({ ...cart, isCartOpen: !cart.isCartOpen });
	return (
		<div className="cart-icon-container" onClick={toggleIsCartOpen}>
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">{cart.items?.length || 0}</span>
		</div>
	);
};

export default CartIcon;

import { useCartContext, QUANTITY_MODE } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = (cartItem) => {
	const { name, imageUrl, price, quantity } = cartItem;
	const { removeItemFromCart, modifyItemQuantity } = useCartContext();
	const removeCheckoutItem = () => removeItemFromCart(cartItem);
	const setCheckoutItemQuantity = (product, mode) => () => modifyItemQuantity(product, mode);
	return (
		<>
			<div className="checkout-item">
				<img src={imageUrl} alt={name} />
				<span>{name}</span>
				<span className="item-quantity">
					<span onClick={setCheckoutItemQuantity(cartItem, QUANTITY_MODE.reduce)}>
						{" < "}
					</span>
					{quantity}
					<span onClick={setCheckoutItemQuantity(cartItem, QUANTITY_MODE.add)}>
						{" > "}
					</span>
				</span>
				<span>{price}</span>
				<span onClick={removeCheckoutItem}>X</span>
			</div>
			<hr />
		</>
	);
};

export default CheckoutItem;

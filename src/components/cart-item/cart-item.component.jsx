import { CartItemContainer, ItemDetails } from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
	const { quantity, name, price, imageUrl } = cartItem;
	return (
		<CartItemContainer>
			<img src={imageUrl} alt={name} />
			<ItemDetails>
				<span className="name">{name}</span>
				<span>
					{quantity} x ${price}
				</span>
			</ItemDetails>
		</CartItemContainer>
	);
};

export default CartItem;

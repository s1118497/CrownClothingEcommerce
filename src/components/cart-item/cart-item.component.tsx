import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import { Product } from "../../store/cart/cart.types";
import { FC, memo } from "react";

type CartItemProps = {
	cartItem: Product;
};

// Memoized <CartItem> Component: will not rerender unless cartItem props have changed.
// 		when same key item added to cart, cartItem props change because in cart.action.js, {...existedItem,quantity: existedItem.quantity + 1}
//		when new key item added to cart, previous cartItem props unchange because in cart.action.js, newCartItems.push({ ...productToAdd, quantity: 1 });
const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
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
});

export default CartItem;

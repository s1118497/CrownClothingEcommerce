import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import { Product } from "../../store/cart/cart.types";
import { FC } from "react";

type CartItemProps = {
	cartItem: Product;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
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

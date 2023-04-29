import { useDispatch } from "react-redux";
import { removeItemFromCart, addItemToCart, clearItemFromCart } from "../../store/cart/cart.action";
import {
	CheckoutItemContainer,
	ImageContainer,
	BaseSpan,
	Quantity,
	RemoveButton,
	Value,
	Arrow,
} from "./checkout-item.styles.jsx";

const CheckoutItem = (cartItem) => {
	const dispatch = useDispatch();

	const { name, imageUrl, price, quantity } = cartItem;

	const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));
	const addItemHandler = () => dispatch(addItemToCart(cartItem));
	const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<BaseSpan>{name}</BaseSpan>
			<Quantity>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>
			<BaseSpan>{price}</BaseSpan>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;

import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.slice";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { ProductCardContainer, Footer, Name, Price } from "./product-card.styles.jsx";

export default function ProductCard(product) {
	const { name, imageUrl, price } = product;

	const dispatch = useDispatch();

	const addProductToCart = () => dispatch(addItemToCart( product));

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button btnType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
				Add to cart
			</Button>
		</ProductCardContainer>
	);
}

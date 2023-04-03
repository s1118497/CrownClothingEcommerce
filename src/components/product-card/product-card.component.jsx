import { useCartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import "./product-card.styles.scss";

export default function ProductCard(product) {
	const { name, imageUrl, price } = product;

	const { addItemToCart } = useCartContext();

	const addProductToCart = () => addItemToCart(product);

	return (
		<div className="product-card-container">
			<img src={imageUrl} alt={`${name}`} />
			<div className="footer">
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</div>
			<Button btnType="inverted" onClick={addProductToCart}>
				Add to cart
			</Button>
		</div>
	);
}

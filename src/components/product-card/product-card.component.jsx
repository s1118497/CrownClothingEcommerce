import Button from "../button/button.component";
import "./product-card.styles.scss";

export default function ProductCard(product) {
	const { name, imageUrl, price } = product;
	return (
		<div className="product-card-container">
			<img src={imageUrl} alt="proudctPic" />
			<div className="footer">
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</div>
			<Button btnType="inverted">Add to cart</Button>
		</div>
	);
}

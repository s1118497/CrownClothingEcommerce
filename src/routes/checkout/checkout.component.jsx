import { useCartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const Checkout = () => {
	const { cartItems, totalCheckoutPrice } = useCartContext();
	return (
		<div className="checkout-container">
			<div className="checkout-header">
				<span>Product</span>
				<span>Descripton</span>
				<span>Quantity</span>
				<span>Price</span>
				<span>Reomve</span>
			</div>
			<hr />
			<div className="checkout-items-container">
				{cartItems.map((cartItem) => (
					<CheckoutItem key={cartItem.id} {...cartItem} />
				))}
			</div>
			<h2>Total: ${totalCheckoutPrice}</h2>
		</div>
	);
};

export default Checkout;

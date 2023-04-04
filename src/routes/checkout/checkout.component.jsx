import { useCartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const Checkout = () => {
	const { cartItems, cartTotal } = useCartContext();
	return (
		<div className="checkout-container">
			<div className="checkout-header">
				<div className="header-block">
					<span>Product</span>
				</div>
				<div className="header-block">
					<span>Descripton</span>
				</div>
				<div className="header-block">
					<span>Quantity</span>
				</div>
				<div className="header-block">
					<span>Price</span>
				</div>
				<div className="header-block">
					<span>Reomve</span>
				</div>
			</div>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} {...cartItem} />
			))}
			<span className="total">Total: ${cartTotal}</span>
		</div>
	);
};

export default Checkout;

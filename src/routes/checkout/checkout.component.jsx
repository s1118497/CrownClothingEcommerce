import { useSelector } from "react-redux";
import { selectCartTotal, selectCartItems } from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles.jsx";
import PaymentForm from "../../components/payment-form/payment-form.component";

const Checkout = () => {
	const cartItems = useSelector(selectCartItems),
		cartTotal = useSelector(selectCartTotal);
	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Descripton</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Reomve</span>
				</HeaderBlock>
			</CheckoutHeader>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} {...cartItem} />
			))}
			<Total>Total: ${cartTotal}</Total>
			<PaymentForm cartTotal={cartTotal} />
		</CheckoutContainer>
	);
};

export default Checkout;

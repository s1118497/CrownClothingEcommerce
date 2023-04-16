import styled from "styled-components";
import { BaseButton, GoogleButton, InvertedButton } from "../button/button.styles";

export const CartDropDownContainer = styled.div`
	position: absolute;
	width: 280px;
	height: 340px;
	display: flex;
	flex-direction: column;
	padding: 20px;
	border: 1px solid black;
	background-color: white;
	top: 90px;
	right: 40px;
	z-index: 5;

	// when <BaseButton> || <GoogleButton> || <InvertedButton> styled component, nested inside <CartDropDownContainer>, apply additional styles
	${BaseButton},${GoogleButton},${InvertedButton} {
		min-width: fit-content;
		margin-top: auto;
	}
`;

export const CartItems = styled.div`
	height: 240px;
	display: flex;
	flex-direction: column;
	overflow: auto;
`;

export const EmptyMessage = styled.span`
	font-size: 18px;
	margin: 50px auto;
`;
/* .cart-dropdown-container {
	position: absolute;
	width: 280px;
	height: 340px;
	display: flex;
	flex-direction: column;
	padding: 20px;
	border: 1px solid black;
	background-color: white;
	top: 90px;
	right: 40px;
	z-index: 5;

	.empty-message {
		font-size: 18px;
		margin: 50px auto;
	}

	.cart-items {
		height: 240px;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}

	button {
		
	}
}
 */

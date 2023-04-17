import styled from "styled-components";

import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";

const CartIconContainer = styled.div`
	width: 45px;
	height: 45px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

// directly target svg component into styled-component, instead of adding class to svg || writing rules inside <CartIconContainer>
const ShoppingIcon = styled(ShoppingSvg)`
	width: 24px;
	height: 24px;
`;

const ItemCount = styled.span`
	position: absolute;
	font-size: 10px;
	font-weight: bold;
	bottom: 12px;
`;

export { CartIconContainer, ItemCount, ShoppingIcon };

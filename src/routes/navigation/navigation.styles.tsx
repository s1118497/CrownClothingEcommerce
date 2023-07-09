import { Link } from "react-router-dom";
import styled from "styled-components";

// style native HTML tag
export const NavigationContainer = styled.div`
	height: 4rem;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;
	text-transform: uppercase;

	@media screen and (width <= 800px) {
		height: 3rem;
		margin-bottom: 1.5rem;
		padding: 10px 5px;
	}
`;

// style 3rd party library component, <Link/> from rrd
export const LogoContainer = styled(Link)`
	width: 70px;
	padding: 25px;

	@media screen and (width <= 800px) {
		width: 50px;
		padding: 0;
	}
`;

export const NavLinks = styled.div`
	height: 100%;
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	@media screen and (width <= 800px) {
		width: 80%;
	}
`;

export const NavLink = styled(Link)`
	cursor: pointer;
	padding: 10px 15px;
	flex-shrink: 0;

	@media screen and (width <= 800px) {
		padding: 5px 10px;
	}
`;

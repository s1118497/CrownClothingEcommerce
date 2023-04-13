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
`;

// style 3rd party library component, <Link/> from rrd
export const LogoContainer = styled(Link)`
	width: 70px;
	padding: 25px;
`;

export const NavLinks = styled.div`
	height: 100%;
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export const NavLink = styled(Link)`
	cursor: pointer;
	padding: 10px 15px;
	flex-shrink: 0;
`;

import styled from "styled-components";

export const CategoryTitle = styled.h2`
	font-size: 38px;
	margin-bottom: 25px;
	text-align: center;
`;

export const CategoryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 20px;
	row-gap: 50px;

	@media screen and (width <= 800px) {
		grid-template-columns: 1fr 1fr;
		gap: 25px 15px;
	}
	@media screen and (width < 400px) {
		grid-template-columns: 1fr;
		row-gap: 15px;
	}
`;

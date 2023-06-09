import styled from "styled-components";

type BackgroundImageProps = {
	imageUrl: string;
};

const BackgroundImage = styled.div<BackgroundImageProps>`
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	background-image: url(${(props) => props.imageUrl});
`;

const Body = styled.div`
	// https://chenhuijing.com/blog/flexbox-and-absolute-positioning/
	position: absolute;
	height: 90px;
	padding: 0 25px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px solid black;
	background-color: white;
	opacity: 0.7;
	text-transform: capitalize;

	h2 {
		font-weight: bold;
		margin: 0 6px 0;
		font-size: 22px;
		color: #4a4a4a;
	}

	p {
		font-weight: lighter;
		font-size: 16px;
	}
`;

const DirectoryItemContainer = styled.div`
	//  make 3 item at first row: 100% width >= 30%x3 - margin;
	min-width: 30%;
	height: 240px;
	//  flex-grow make 2 item in second row: 50% of remaining space
	flex: 1 1 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid black;
	margin: 0 7.5px 15px;
	// backgroundImage scale transition will cause overflow
	overflow: hidden;

	&:hover {
		cursor: pointer;

		/* select the styledComponent */
		& ${BackgroundImage} {
			transform: scale(1.1);
			transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
		}

		/* select the styledComponent */
		& ${Body} {
			opacity: 0.9;
		}
	}

	&:first-child {
		margin-right: 7.5px;
	}

	&:last-child {
		margin-left: 7.5px;
	}

	@media screen and (430px <= width <= 800px) {
		height: 200px;
	}
`;

export { BackgroundImage, Body, DirectoryItemContainer };

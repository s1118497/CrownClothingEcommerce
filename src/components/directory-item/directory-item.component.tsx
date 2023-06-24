import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { DirectoryCategory } from "../directory/directory.component";

import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.style";

type DirectoryItemProps = {
	category: DirectoryCategory;
};
const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
	const { title, imageUrl, route } = category;
	const navigate = useNavigate();
	const onNavigateHandler = () => navigate(route);
	return (
		<DirectoryItemContainer>
			{/* <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} /> */}
			<BackgroundImage imageUrl={imageUrl} />
			<Body onClick={onNavigateHandler}>
				<h2>{title}</h2>
				<p>shop now</p>
			</Body>
		</DirectoryItemContainer>
	);
};
export default DirectoryItem;

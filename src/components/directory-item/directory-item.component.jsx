import { useNavigate } from "react-router-dom";
import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.style";

const DirectoryItem = ({ category }) => {
	const { title, imageUrl } = category;
	const navigate = useNavigate();
	return (
		<DirectoryItemContainer>
			{/* <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} /> */}
			<BackgroundImage imageUrl={imageUrl} />
			<Body onClick={() => navigate(`/shop/${title}`)}>
				<h2>{title}</h2>
				<p>shop now</p>
			</Body>
		</DirectoryItemContainer>
	);
};
export default DirectoryItem;

import { useNavigate } from "react-router-dom";
import "./directory-item.style.scss";

const DirectoryItem = ({ category }) => {
	const { title, imageUrl } = category;
	const navigate = useNavigate();
	return (
		<div className="directory-item-container">
			<div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
			<div className="body" onClick={() => navigate(`/shop/${title}`)}>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	);
};
export default DirectoryItem;

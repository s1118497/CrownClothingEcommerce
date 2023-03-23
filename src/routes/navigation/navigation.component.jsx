import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => (
	<>
		<div className="navigation">
			<Link to="/" className="logo-container">
				<Logo className="logo" />
			</Link>
			<div className="nav-links-container">
				<Link className="nav-link" to="shop">
					Shop
				</Link>
				<Link className="nav-link">Contact</Link>
				<Link className="nav-link" to="auth">
					Sign In
				</Link>
				<Link className="nav-link">Cart</Link>
			</div>
		</div>
		<Outlet />
	</>
);

export default Navigation;

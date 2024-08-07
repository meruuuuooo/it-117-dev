


const Logout = ({ setIsAuthenticated }) => {
	const handleLogout = () => {
		localStorage.setItem("is_authenticated", false);
		localStorage.removeItem("role")
		localStorage.removeItem("info")
		localStorage.clear();
		setIsAuthenticated(false);
	};

	return (
		<li onClick={handleLogout} className="nk-menu-item">
			<a href="/login" className="nk-menu-link">
				<span className="nk-menu-icon">
					<em className="icon ni ni-power"></em>
				</span>
				<span className="nk-menu-text">Logout</span>
			</a>
		</li>
	);
};

export default Logout;

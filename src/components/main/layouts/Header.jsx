const LayoutHeader = ({ setIsAuthenticated, setUserLog }) => {

	const role = localStorage.getItem("role");
	const email = localStorage.getItem("email");
	const fullName = localStorage.getItem("fullName")
	const displayName = localStorage.getItem("displayName")

	return (
		<>
			<div
				className="nk-header nk-header-fixed is-light"
				style={{ borderTop: "10px solid #b4543d" }}
			>
				<div className="container-fluid">
					<div className="nk-header-wrap">
						<div className="nk-menu-trigger d-xl-none ms-n1">
							<a
								href="#"
								className="nk-nav-toggle nk-quick-nav-icon"
								data-target="sidebarMenu"
							>
								<em className="icon ni ni-menu"></em>
							</a>
						</div>
						<div className="nk-header-brand d-xl-none">
							<a href="/" className="logo-link">
								<img
									className="logo-light logo-img"
									src="/mainlogo.png"
									alt="logo"
								/>
								<img
									className="logo-dark logo-img"
									src="/mainlogo.png"
									alt="logo-dark"
								/>
							</a>
						</div>
						<div className="nk-header-tools">
							<ul className="nk-quick-nav">
								{role === "user" && (
									<li
										data-bs-toggle="modal"
										data-bs-target="#modalTop"
										className="dropdown notification-dropdown"
									>
										<a
											href="#"
											className="dropdown-toggle nk-quick-nav-icon"
											data-bs-toggle="dropdown"
										>
											<div className="icon-status icon-status-danger">
												<em className="icon ni ni-cart"></em>
											</div>
										</a>
									</li>
								)}
								<li className="dropdown user-dropdown">
									<a
										href="#"
										className="dropdown-toggle me-n1"
										data-bs-toggle="dropdown"
									>
										<div className="user-toggle">
											<div
												className="user-avatar sm"
												style={{ backgroundColor: "#ffffff" }}
											>
												<img src="/user.png" />
											</div>
											<div className="user-info d-none d-xl-block">
												<div
													className="user-status user-status-active"
													style={{ color: "#b4543d" }}
												>
												</div>
												<div
													className="user-name dropdown-indicator"
													style={{ textTransform: "uppercase" }}
												>
													{displayName}
												</div>
											</div>
										</div>
									</a>
									<div className="dropdown-menu dropdown-menu-md dropdown-menu-end">
										<div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
											<div className="user-card">
												<div className="user-avatar">
													<img src="/user.png" />
												</div>
												<div className="user-info">
													<span className="lead-text">{role}</span>
													<span className="sub-text">{fullName}</span>
												</div>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LayoutHeader;

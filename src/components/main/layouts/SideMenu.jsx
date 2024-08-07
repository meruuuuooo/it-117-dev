import { Link } from "react-router-dom";
import Logout from "../../auth/Logout";

const SideMenu = ({ setIsAuthenticated, setSelectedSideMenu }) => {

    const role = localStorage.getItem("role");

    return (
        <div className="nk-sidebar nk-sidebar-fixed is-light" data-content="sidebarMenu">
            <div className="nk-sidebar-element nk-sidebar-head">
                <div className="nk-sidebar-brand">
                    <a href="/" className="logo-link nk-sidebar-logo">
                        <img className="logo-light logo-img" src="./images/logo.png" alt="logo" />
                        <img className="logo-dark logo-img" src="./images/logo-dark.png" alt="logo-dark" />
                        <img className="logo-small logo-img logo-img-small" src="./images/logo-small.png" alt="logo-small" />
                    </a>
                </div>
                <div className="nk-menu-trigger me-n2">
                    <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu">
                        <em className="icon ni ni-arrow-left"></em>
                    </a>
                    <a href="#" className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu">
                        <em className="icon ni ni-menu-alt-r"></em>
                    </a>
                </div>
            </div>
            <div className="nk-sidebar-element nk-sidebar-body">
                <div className="nk-sidebar-menu">
                    <ul className="nk-menu">
                        {role === "admin" && (
                            <>
                                <li className="nk-menu-item">
                                    <Link to="/dashboard" className="nk-menu-link" onClick={() => setSelectedSideMenu("dashboard")}>
                                        <span className="nk-menu-icon">
                                            <em className="icon ni ni-dashboard"></em>
                                        </span>
                                        <span className="nk-menu-text">Dashboard</span>
                                    </Link>
                                </li>
                                <li className="nk-menu-item">
                                    <Link to="/products" className="nk-menu-link" onClick={() => setSelectedSideMenu("products")}>
                                        <span className="nk-menu-icon">
                                            <em className="icon ni ni-box"></em>
                                        </span>
                                        <span className="nk-menu-text">Inventory</span>
                                    </Link>
                                </li>
                                <li className="nk-menu-item">
                                    <Link to="/orders" className="nk-menu-link" onClick={() => setSelectedSideMenu("orders")}>
                                        <span className="nk-menu-icon">
                                            <em className="icon ni ni-cart"></em>
                                        </span>
                                        <span className="nk-menu-text">Orders</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        {role === "user" && (
                            <>
                                <li className="nk-menu-item">
                                    <Link to="/pos" className="nk-menu-link" onClick={() => setSelectedSideMenu("pos")}>
                                        <span className="nk-menu-icon">
                                            <em className="icon ni ni-cart"></em>
                                        </span>
                                        <span className="nk-menu-text">Products</span>
                                    </Link>
                                </li>
                                <li className="nk-menu-item">
                                    <Link to="/profile" className="nk-menu-link" onClick={() => setSelectedSideMenu("profile")}>
                                        <span className="nk-menu-icon">
                                            <em className="icon ni ni-account-setting"></em>
                                        </span>
                                        <span className="nk-menu-text">Profile</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div className="nk-sidebar-footer">
                    <Logout setIsAuthenticated={setIsAuthenticated} />
                </div>
            </div>
        </div>
    );
};

export default SideMenu;

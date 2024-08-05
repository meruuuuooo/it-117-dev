import Logout from "../../auth/Logout";

const SideMenu = ({ setSelectedMenu, setIsAuthenticated }) => {


    const handleMenu = (menu) => {
        setSelectedMenu(menu);
    }


	return (
        <>
        <div className="nk-sidebar nk-sidebar-fixed is-light" data-content="sidebarMenu">
                  <div className="nk-sidebar-element nk-sidebar-head">
                      <div className="nk-sidebar-brand">
                          <a href="html/index.html" className="logo-link nk-sidebar-logo">
                              <img className="logo-light logo-img" src="./images/logo.png" alt="logo"/>
                              <img className="logo-dark logo-img" src="./images/logo-dark.png"  alt="logo-dark"/>
                              <img className="logo-small logo-img logo-img-small" src="./images/logo-small.png"  alt="logo-small"/>
                          </a>
                      </div>
                      <div className="nk-menu-trigger me-n2">
                          <a href="#" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em className="icon ni ni-arrow-left"></em></a>
                          <a href="#" className="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu"><em className="icon ni ni-menu"></em></a>
                      </div>
                  </div>
                  <div className="nk-sidebar-element">
                      <div className="nk-sidebar-content">
                          <div className="nk-sidebar-menu" data-simplebar>
                              <ul className="nk-menu">
                                  <li onClick={() =>handleMenu("Dashboard")} className="nk-menu-item">
                                      <a href="#" className="nk-menu-link">
                                          <span className="nk-menu-icon"><em className="icon ni ni-dashboard-fill"></em></span>
                                          <span className="nk-menu-text">Dashboard</span>
                                      </a>
                                  </li>
                                  <li onClick={() =>handleMenu("Pos")} className="nk-menu-item">
                                      <a href="#" className="nk-menu-link">
                                          <span className="nk-menu-icon"><em className="icon ni ni-cart-fill"></em></span>
                                          <span className="nk-menu-text">POS</span>
                                      </a>
                                  </li>
                                  <li onClick={() => handleMenu("Orders")} className="nk-menu-item">
                                      <a href="#" className="nk-menu-link">
                                          <span className="nk-menu-icon"><em className="icon ni ni-bag-fill"></em></span>
                                          <span className="nk-menu-text">Orders</span>
                                      </a>
                                  </li>
                                  <li onClick={() =>handleMenu("Products")} className="nk-menu-item">
                                      <a href="#" className="nk-menu-link">
                                          <span className="nk-menu-icon"><em className="icon ni ni-package-fill"></em></span>
                                          <span className="nk-menu-text">Products</span>
                                      </a>
                                  </li>
                                  {/* <li className="nk-menu-item">
                                      <a href="/customer" className="nk-menu-link">
                                          <span className="nk-menu-icon"><em className="icon ni ni-users-fill"></em></span>
                                          <span className="nk-menu-text">Customers</span>
                                      </a>
                                  </li>
                                  <li className="nk-menu-item">
                                      <a href="/supports" className="nk-menu-link">
                                          <span className="nk-menu-icon"><em className="icon ni ni-chat-fill"></em></span>
                                          <span className="nk-menu-text">Supports</span>
                                      </a>
                                  </li> */}
                                  <li className="nk-menu-item">
                                      <a href="#" className="nk-menu-link">
                                          <span className="nk-menu-icon"><em className="icon ni ni-opt-alt-fill"></em></span>
                                          <span className="nk-menu-text">Settings</span>
                                      </a>
                                  </li>
                                  {/* <li className="nk-menu-item">
                                      <a href="/integration" className="nk-menu-link">
                                          <span className="nk-menu-icon"><em className="icon ni ni-server-fill"></em></span>
                                          <span className="nk-menu-text">Integration</span>
                                      </a>
                                  </li> */}
                                  <li className="nk-menu-heading">
                                      <h6 className="overline-title text-primary-alt">Return to</h6>
                                  </li>
                                  <li className="nk-menu-item">
                                      <a href="#" className="nk-menu-link">
                                          <span className="nk-menu-icon"><em className="icon ni ni-setting"></em></span>
                                          <span className="nk-menu-text">Settings</span>
                                      </a>
                                  </li>
                                  <Logout setIsAuthenticated={setIsAuthenticated}/>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
      </>
	);
};

export default SideMenu;
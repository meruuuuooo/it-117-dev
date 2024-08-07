import LayoutHeader from "./../main/layouts/Header";
import LayoutFooter from "./../main/layouts/Footer";
import LayoutSideMenu from "./../main/layouts/SideMenu";
import POS from "./pos/Index";
import Profile from "./pos/Profile";
// import Settings from "./user/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserMain = ({ setIsAuthenticated, products, getProducts, role, selectedSideMenu, setSelectedSideMenu }) => {
    
    let menu = <Profile />;

    if (selectedSideMenu === "pos") {
        menu = <POS getProducts={getProducts} products={products} />;
    } else if (selectedSideMenu === "profile") {
        menu = <Profile />;
    }
    
    return (
        <div className="nk-app-root">
            <div className="nk-main">
                <LayoutSideMenu
                    setIsAuthenticated={setIsAuthenticated}
                    role={role}  // Pass the role here
                    setSelectedSideMenu={setSelectedSideMenu}
                />
                <div className="nk-wrap">
                    <LayoutHeader setIsAuthenticated={setIsAuthenticated} />
                    <div className="nk-content">
                        <div className="container-fluid">
                            {menu}
                            <ToastContainer
                                position="top-right"
                                autoClose={400}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover={false}
                                theme="light"
                            />
                        </div>
                    </div>
                    <LayoutFooter />
                </div>
            </div>
        </div>
    );
};

export default UserMain;

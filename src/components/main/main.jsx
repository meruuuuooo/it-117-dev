import LayoutHeader from "./layouts/Header";
import LayoutFooter from "./layouts/Footer";
import LayoutSideMenu from "./layouts/SideMenu";
import Dashboard from "./dashboard/Index";
import Products from "./products/Index";
import Orders from "./orders/Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminMain = ({ setIsAuthenticated, getProducts, products, setProducts, role, selectedSideMenu, setSelectedSideMenu }) => {


	let menu = <Dashboard />;

	if (selectedSideMenu === "dashboard") {
		menu = <Dashboard
			getProducts={getProducts}
			products={products}
			setProducts={setProducts}
		/>;
	} else if (selectedSideMenu === "products") {
		menu = <Products
			products={products}
			setProducts={setProducts}
			getProducts={getProducts}
		/>;
	}else if (selectedSideMenu === "orders") {
		menu = <Orders
			getProducts={getProducts}
			products={products}
			setProducts={setProducts}
		/>;
	}


    return (
        <div className="nk-app-root">
            <div className="nk-main">
                <LayoutSideMenu setIsAuthenticated={setIsAuthenticated} setSelectedSideMenu={setSelectedSideMenu} role={role} />
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

export default AdminMain;

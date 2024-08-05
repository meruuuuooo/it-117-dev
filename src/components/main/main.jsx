import { useEffect, useState } from "react";
import LayoutHeader from "./layouts/Header";
import LayoutFooter from "./layouts/Footer";
import LayoutSideMenu from "./layouts/SideMenu";
import Pos from "./pos/Index";
import Dashboard from "./dashboard/Index";
import Products from "./products/Index";
import Orders from "./orders/Index";

import axios from "axios";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firestore";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = ({ setIsAuthenticated }) => {
	const [products, setProducts] = useState([]);
	const [selectedMenu, setSelectedMenu] = useState("dashboard");

	// const getProducts = async () => {
	// 	const querySnapshot = await getDocs(collection(db, "products"));
	// 	const products = querySnapshot.docs.map((doc) => ({
	// 		id: doc.id,
	// 		...doc.data(),
	// 	}));
	// 	setProducts(products);
	// };

	const getProducts = async () => {
		try {
			const response = await axios.get("http://localhost:3000/products");
			const data = await response.data;

			setProducts(data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	let menu = <Dashboard />;

	if (selectedMenu === "Dashboard") {
		menu = <Dashboard />;
	} else if (selectedMenu === "Pos") {
		menu = (
			<Pos
				products={products}
				setProducts={setProducts}
				getProducts={getProducts}
			/>
		);
	} else if (selectedMenu === "Products") {
		menu = (
			<Products
				products={products}
				setProducts={setProducts}
				getProducts={getProducts}
			/>
		);
	} else if (selectedMenu === "Orders") {
		menu = <Orders />
	}

	return (
		<>
			<div className="nk-app-root">
				<div className="nk-main">
					<LayoutSideMenu
						setIsAuthenticated={setIsAuthenticated}
						setSelectedMenu={setSelectedMenu}
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
		</>
	);
};

export default Main;

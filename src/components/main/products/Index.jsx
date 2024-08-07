import { useState } from "react";

// import {doc, deleteDoc } from "firebase/firestore";
// import { db } from "../../../config/firestore";
// import ImportDataButton from "./importDataToFirestore";

import axios from "axios";

import Swal from "sweetalert2";
import Modal from "./AddModal";

const Products = ({ products, setProducts, getProducts }) => {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [search, setSearch] = useState("");
	const [checkedItems, setCheckedItems] = useState([]);
	const [selectAll, setSelectAll] = useState(false);

	const [name, setName] = useState("");
	const [model, setModel] = useState("");
	const [manufacturer, setManufacturer] = useState("");
	const [description, setDescription] = useState("none");
	const [price, setPrice] = useState();
	const [quantityInStock, setQuantityInStock] = useState();
	const [image, setImage] = useState("public/images/example/example.png");
	const [category, setCategory] = useState("Uncategorized");

	const [productId, setProductId] = useState("");

	const handleEditClick = (product) => {
		setProductId(product.id);
		setName(product.name);
		setModel(product.model);
		setManufacturer(product.manufacturer);
		setDescription(product.description);
		setPrice(product.price);
		setQuantityInStock(product.quantityInStock);
		setImage(product.image);
		setCategory(product.category);
	};

	const handleUpdateFormSubmit = async (e) => {
		e.preventDefault();

		const id = productId;
	
		// Create the updated product object
		const updatedProduct = {
			name,
			model,
			manufacturer,
			description,
			price,
			quantityInStock,
			image,
			category,
		};
	
		try {
			// Send a PUT request to update the product on the JSON server
			const response = await axios.put(`http://localhost:3000/products/${id}`, updatedProduct);
	
			if (response.status === 200) {

				const modalElement = document.getElementById("updatedModalForm");
				const modalInstance = bootstrap.Modal.getInstance(modalElement);
				modalInstance.hide();

				Swal.fire({
					icon: 'success',
					title: 'Product Updated',
					text: 'The product was updated successfully!',
					timer: 2000,
					showConfirmButton: false,
				});

				getProducts();
	
			} else {
				// Handle any errors
				Swal.fire({
					icon: 'error',
					title: 'Update Failed',
					text: 'Failed to update the product. Please try again.',
				});
			}
		} catch (error) {
			// Handle any errors that occur during the request
			console.error("Error updating the product:", error);
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'An error occurred while updating the product. Please try again.',
			});
		}
	};
	

	const categories = [
		"All",
		"Case",
		"CPU",
		"Mouse",
		"CPU Cooler",
		"Headphones",
		"Keyboard",
		"Memory",
		"Monitor",
		"Video Card",
		"Motherboard",
		"Power Supply",
		"Ethernet Cable",
		"Internal Hard Drive",
		"Out of Stock",
	];

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const filteredProducts = products.filter((product) => {
		const matchesCategory =
			selectedCategory === "All" ||
			(selectedCategory === "Out of Stock" && product.quantityInStock === 0) ||
			(selectedCategory !== "Out of Stock" &&
				product.category === selectedCategory);

		const matchesSearch =
			product.name.toLowerCase().includes(search.toLowerCase()) ||
			product.model.toLowerCase().includes(search.toLowerCase()) ||
			product.manufacturer.toLowerCase().includes(search.toLowerCase());

		return matchesCategory && matchesSearch;
	});

	const handleDelete = async (id) => {
		try {
			// Send DELETE request to JSON-server
			const response = await fetch(`http://localhost:3000/products/${id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				getProducts(); // Refresh the product list
			} else {
				throw new Error("Failed to delete product");
			}
		} catch (error) {
			console.log("Error removing document: ", error);
		}
	};

	const handleDeleteSelected = async () => {
		const result = await Swal.fire({
			title: "Are you sure?",
			text: "This action cannot be undone!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "Cancel",
		});

		if (result.isConfirmed) {
			try {
				// Send DELETE requests htmlFor all selected items
				await Promise.all(
					checkedItems.map((id) =>
						fetch(`http://localhost:3000/products/${id}`, {
							method: "DELETE",
						})
					)
				);

				setCheckedItems([]);
				getProducts();

				Swal.fire(
					"Deleted!",
					"Your selected products have been deleted.",
					"success"
				);
			} catch (error) {
				console.log("Error removing documents: ", error);
				Swal.fire(
					"Error!",
					"There was an error deleting the products.",
					"error"
				);
			}
		}
	};

	const handleCheckAllBox = (event) => {
		const isChecked = event.target.checked;
		setSelectAll(isChecked);
		setCheckedItems(isChecked ? filteredProducts.map((item) => item.id) : []);
	};

	const handleCheckboxChange = (item) => {
		setCheckedItems((prevCheckedItems) => {
			if (prevCheckedItems.includes(item.id)) {
				return prevCheckedItems.filter((id) => id !== item.id);
			} else {
				return [...prevCheckedItems, item.id];
			}
		});
	};

	return (
		<>
			<div className="nk-content ">
				<div className="container-fluid">
					<div className="nk-content-inner">
						<div className="nk-content-body">
							<div className="nk-block-head nk-block-head-sm">
								<div className="nk-block-between">
									<div className="nk-block-head-content">
										<h3 className="nk-block-title page-title">Inventory</h3>
									</div>
									<div className="nk-block-head-content">
										<div className="toggle-wrap nk-block-tools-toggle">
											<a
												href="#"
												className="btn btn-icon btn-trigger toggle-expand me-n1"
												data-target="pageMenu"
											>
												<em className="icon ni ni-more-v"></em>
											</a>
											<div
												className="toggle-expand-content"
												data-content="pageMenu"
											>
												<ul className="nk-block-tools g-3">
													<li>
														<div className="form-control-wrap">
															<div className="form-icon form-icon-right">
																<em className="icon ni ni-search"></em>
															</div>
															<input
																type="text"
																className="form-control"
																id="default-04"
																placeholder="Quick search by id"
																onChange={handleSearchChange}
															/>
														</div>
													</li>
													<li>
														<div className="dropdown">
															<button
																className="btn btn-secondary dropdown-toggle"
																type="button"
																id="dropdownMenuButton"
																data-bs-toggle="dropdown"
																aria-expanded="false"
															>
																{selectedCategory}
															</button>
															<div className="dropdown-menu dropdown-menu-end">
																<ul className="link-list-opt no-bdr">
																	{categories.map((category) => (
																		<li key={category}>
																			<a
																				href="#"
																				onClick={() =>
																					handleCategoryChange(category)
																				}
																			>
																				<span>{category}</span>
																			</a>
																		</li>
																	))}
																</ul>
															</div>
														</div>
													</li>
													<li className="nk-block-tools-opt">
														<a
															href="#"
															data-target="addProduct"
															className="toggle btn btn-icon btn-primary d-md-none"
														>
															<em className="icon ni ni-plus"></em>
														</a>
														<Modal
															getProducts={getProducts}
															products={products}
															setProducts={setProducts}
														/>
														{/* <ImportDataButton getProducts={getProducts} /> */}
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="nk-block">
								<div className="nk-tb-list is-separate mb-3">
									<div className="nk-tb-item nk-tb-head">
										<div className="nk-tb-col nk-tb-col-check">
											<div className="custom-control custom-control-sm custom-checkbox notext">
												<input
													type="checkbox"
													className="custom-control-input"
													id="pid"
													checked={selectAll}
													onChange={handleCheckAllBox}
												/>
												<label
													className="custom-control-label"
													htmlFor="pid"
												></label>
											</div>
										</div>
										<div className="nk-tb-col tb-col-sm">
											<span>Name</span>
										</div>
										<div className="nk-tb-col">
											<span>Model</span>
										</div>
										<div className="nk-tb-col">
											<span>Manufacturer</span>
										</div>
										<div className="nk-tb-col">
											<span>Price</span>
										</div>
										<div className="nk-tb-col">
											<span>Stock</span>
										</div>
										<div className="nk-tb-col tb-col-md">
											<span>Category</span>
										</div>
										<div className="nk-tb-col tb-col-md">
											<em className="tb-asterisk icon ni ni-star-round"></em>
										</div>
										<div className="nk-tb-col nk-tb-col-tools">
											<ul className="nk-tb-actions gx-1 my-n1">
												<li className="me-n1">
													<div className="dropdown">
														<a
															href="#"
															className="dropdown-toggle btn btn-icon btn-trigger"
															data-bs-toggle="dropdown"
														>
															<em className="icon ni ni-more-h"></em>
														</a>
														<div className="dropdown-menu dropdown-menu-end">
															<ul className="link-list-opt no-bdr">
																<li
																	className={
																		checkedItems.length === 0 ? "disabled" : ""
																	}
																>
																	<a
																		href="#"
																		onClick={(e) => {
																			if (checkedItems.length > 0) {
																				handleDeleteSelected();
																			} else {
																				e.preventDefault(); // Prevent the link from being clicked if no items are selected
																			}
																		}}
																		className={
																			checkedItems.length === 0
																				? "disabled-link"
																				: ""
																		}
																	>
																		<em className="icon ni ni-trash"></em>
																		<span>Remove Selected</span>
																	</a>
																</li>
															</ul>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>

									{products.length < 1 ? (
										<div className="nk-tb-item">
											<div className="nk-tb-col nk-tb-col-check">
												<div className="custom-control custom-control-sm custom-checkbox notext"></div>
											</div>
											<div className="nk-tb-col tb-col-sm">
												<span className="tb-product">
													<span className="title">No products found</span>
												</span>
											</div>
										</div>
									) : (
										filteredProducts.map((product) => (
											<div key={product.id} className="nk-tb-item">
												<div className="nk-tb-col nk-tb-col-check">
													<div className="custom-control custom-control-sm custom-checkbox notext">
														<input
															type="checkbox"
															className="custom-control-input"
															id={`pid-${product.id}`}
															checked={checkedItems.includes(product.id)}
															onChange={() => handleCheckboxChange(product)}
														/>
														<label
															className="custom-control-label"
															htmlFor={`pid-${product.id}`}
														></label>
													</div>
												</div>
												<div className="nk-tb-col tb-col-sm">
													<span className="tb-product">
														<img src={product.image} alt="" className="thumb" />
														<span className="title">{product.name}</span>
													</span>
												</div>
												<div className="nk-tb-col">
													<span className="tb-sub">{product.model}</span>
												</div>
												<div className="nk-tb-col">
													<span className="tb-sub">{product.manufacturer}</span>
												</div>
												<div className="nk-tb-col">
													<span className="tb-lead">&#x20B1; {product.price}</span>
												</div>
												<div className="nk-tb-col">
													<span className="tb-sub">
														{product.quantityInStock}
													</span>
												</div>
												<div className="nk-tb-col tb-col-md">
													<span className="tb-sub">{product.category}</span>
												</div>
												<div className="nk-tb-col tb-col-md">
													<div className="asterisk tb-asterisk">
														<a href="#">
															<em className="asterisk-off icon ni ni-star"></em>
															<em className="asterisk-on icon ni ni-star-fill"></em>
														</a>
													</div>
												</div>
												<div className="nk-tb-col nk-tb-col-tools">
													<ul className="nk-tb-actions gx-1 my-n1">
														<li className="me-n1">
															<div className="dropdown">
																<a
																	href="#"
																	className="dropdown-toggle btn btn-icon btn-trigger"
																	data-bs-toggle="dropdown"
																>
																	<em className="icon ni ni-more-h"></em>
																</a>
																<div className="dropdown-menu dropdown-menu-end">
																	<ul className="link-list-opt no-bdr">
																		<li 
																			data-bs-toggle="modal"
																			data-bs-target="#updatedModalForm"
																			onClick={() => handleEditClick(product)}			
																		>
																			<a href="#">
																				<em className="icon ni ni-edit"></em>
																				<span>Edit Product</span>
																			</a>
																		</li>
																		<li>
																			<a href="#">
																				<em className="icon ni ni-eye"></em>
																				<span>View Product</span>
																			</a>
																		</li>
																		<li
																			onClick={() =>
																				checkedItems.length > 0 &&
																				handleDelete(product.id)
																			}
																			className={
																				checkedItems.length === 0
																					? "disabled"
																					: ""
																			}
																		>
																			<a
																				href="#"
																				className={
																					checkedItems.length === 0
																						? "disabled-link"
																						: ""
																				}
																			>
																				<em className="icon ni ni-trash"></em>
																				<span>Remove Selected</span>
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
														</li>
													</ul>
												</div>
											</div>
										))
									)}
								</div>
							</div>
							<div className="modal fade" id="updatedModalForm">
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">Update Info</h5>
											<a
												href="#"
												className="close"
												data-bs-dismiss="modal"
												aria-label="Close"
											>
												<em className="icon ni ni-cross"></em>
											</a>
										</div>
										<div className="modal-body">
											<form
												onSubmit={handleUpdateFormSubmit}
												className="form-validate is-alter"
											>
												<div className="form-group">
													<label className="form-label" htmlFor="product-name">
														Name
													</label>
													<div className="form-control-wrap">
														<input
															type="text"
															className="form-control"
															id="full-name"
															value={name}
															required
															onChange={(e) => setName(e.target.value)}
														/>
													</div>
												</div>
												<div className="form-group">
													<label className="form-label" htmlFor="model">
														Model
													</label>
													<div className="form-control-wrap">
														<input
															type="text"
															className="form-control"
															id="model"
															value={model}
															onChange={(e) => setModel(e.target.value)}
														/>
													</div>
												</div>
												<div className="form-group">
													<label className="form-label" htmlFor="manufacturer">
														manufacturer
													</label>
													<div className="form-control-wrap">
														<input
															type="text"
															className="form-control"
															id="manufacturer"
															value={manufacturer}
															onChange={(e) => setManufacturer(e.target.value)}
														/>
													</div>
												</div>
												<div className="form-group">
													<label className="form-label" htmlFor="description">
														Description
													</label>
													<div className="form-control-wrap">
														<input
															type="text"
															className="form-control"
															id="description"
															value={description}
															onChange={(e) => setDescription(e.target.value)}
														/>
													</div>
												</div>
												<div className="form-group">
													<label className="form-label" htmlFor="price">
														Price
													</label>
													<div className="form-control-wrap">
														<input
															type="number"
															className="form-control"
															id="price"
															value={price}
															onChange={(e) => setPrice(e.target.value)}
														/>
													</div>
												</div>
												<div className="form-group">
													<label className="form-label" htmlFor="product-stock">
														Stock
													</label>
													<div className="form-control-wrap">
														<input
															type="number"
															className="form-control"
															id="product-stock"
															value={quantityInStock}
															onChange={(e) =>
																setQuantityInStock(e.target.value)
															}
														/>
													</div>
												</div>
												<div className="form-group">
													<label className="form-label" htmlFor="product-image">
														Upload Image
													</label>
													<div className="form-control-wrap">
														<input
															type="file"
															className="form-control"
															id="product-image"
															onChange={(e) => setImage(e.target.value)}
														/>
													</div>
												</div>
												<div className="form-group">
													<label className="form-label">Category</label>
													<ul className="custom-control-group g-3 align-center">
														{categories.map((categoryList, index) => {
															const id = `com-${categoryList
																.toLowerCase()
																.replace(/ /g, "-")}`;
															return (
																<li key={index}>
																	<div className="custom-control custom-control-sm custom-radio">
																		<input
																			type="radio"
																			className="custom-control-input"
																			id={id}
																			name="category"
																			checked={category === categoryList}
																			onChange={() =>
																				handleCategoryChange(categoryList)
																			}
																		/>
																		<label
																			className="custom-control-label"
																			htmlFor={id}
																		>
																			{categoryList.toLowerCase()}
																		</label>
																	</div>
																</li>
															);
														})}
													</ul>
												</div>
												<div className="modal-footer">
													<div className="form-group">
														<button
															type="submit"
															className="btn btn-lg btn-primary"
														>
															Save Information
														</button>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Products;

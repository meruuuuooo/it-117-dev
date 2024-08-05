import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

const Pos = ({ products }) => {
	const [cart, setCart] = useState(
		() => JSON.parse(localStorage.getItem("cart")) || []
	);
	const [selections, setSelections] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [search, setSearch] = useState("");
	const [checkedItems, setCheckedItems] = useState([]);
	const [selectAll, setSelectAll] = useState(false);

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

	useEffect(() => {
		setSelections(
			products.map((product) => ({
				...product,
				quantity: 1,
				selectedLength: product.category === "Ethernet Cable" ? 10 : null,
				isSelected: false,
				selectedPrice:
					product.category === "Ethernet Cable"
						? (product.price / 10) * 10 // Adjusted calculation
						: product.price,
			}))
		);
	}, [products]);

	const addProductToCart = async (product) => {
		const uniqueId = `${product.id}-${Date.now()}`;
		const basePrice = product.price; // Base price from JSON
		const selectedLength = product.selectedLength || 10; // Default to 10 meters if not selected
		const totalAmount = (basePrice / 10) * selectedLength; // Adjusted price for selected length

		const newCartItem = {
			id: uniqueId,
			productId: product.id,
			name: product.name,
			selectedLength,
			totalAmount: totalAmount * product.quantity, // Format total amount
			quantity: product.quantity,
			image: product.image,
			category: product.category,
		};

		// Deduct the quantityInStock
		const updatedProduct = {
			...product,
			quantityInStock: product.quantityInStock - product.quantity,
		};

		try {
			// Update stock on JSON-server
			const response = await fetch(
				`http://localhost:3000/products/${product.id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						quantityInStock: updatedProduct.quantityInStock,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update the stock quantity");
			}

			// Add to cart and update localStorage
			setCart((prevCart) => [...prevCart, newCartItem]);
			localStorage.setItem("cart", JSON.stringify([...cart, newCartItem]));

			toast.success("Product added to cart", {
				position: "top-right",
				autoClose: 400,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});

			setSelections((prevSelections) =>
				prevSelections.map((item) =>
					item.id === product.id
						? {
								...item,
								quantityInStock: updatedProduct.quantityInStock,
								quantity: 1,
								selectedLength:
									product.category === "Ethernet Cable" ? 10 : null,
								isSelected: false,
								selectedPrice: (product.price / 10) * 10,}
						: item
				)
			);
		} catch (error) {
			console.error("Error updating product quantityInStock:", error);
			toast.error("Failed to update the product stock. Please try again.", {
				position: "top-right",
				autoClose: 400,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const filteredSelections = selections
		.map((selection, originalIndex) => ({ selection, originalIndex }))
		.filter(({ selection }) => {
			const matchesCategory =
				selectedCategory === "All" ||
				(selectedCategory === "Out of Stock" &&
					selection.quantityInStock === 0) ||
				(selectedCategory !== "Out of Stock" &&
					selection.category === selectedCategory);

			const matchesSearch =
				selection.name.toLowerCase().includes(search.toLowerCase()) ||
				selection.model.toLowerCase().includes(search.toLowerCase()) ||
				selection.manufacturer.toLowerCase().includes(search.toLowerCase());

			return matchesCategory && matchesSearch;
		});

	const handleQuantityChange = (originalIndex, delta) => {
		setSelections((prevSelections) =>
			prevSelections.map((selection, index) => {
				if (index === originalIndex) {
					const newQuantity = Math.max(selection.quantity + delta, 1);
					const basePrice = selection.price;
					const newLength = selection.selectedLength || 10;
					const newPrice = ((basePrice / 10) * newLength).toFixed(2); // Adjusted calculation
					return {
						...selection,
						quantity: newQuantity,
						selectedPrice: newPrice * newQuantity, // Calculate total price based on quantity
					};
				}
				return selection;
			})
		);
	};

	const handleLengthSelection = (originalIndex, length) => {
		setSelections((prevSelections) =>
			prevSelections.map((selection, index) => {
				if (index === originalIndex) {
					const isSelected =
						selection.isSelected && selection.selectedLength === length;
					const newLength = isSelected ? 10 : length; // Toggle selection
					const basePrice = selection.price;
					const newPrice = (basePrice / 10) * newLength; // Adjusted calculation

					return {
						...selection,
						selectedLength: newLength,
						isSelected: !isSelected,
						selectedPrice: newPrice * selection.quantity, // Calculate total price based on quantity
					};
				}
				return selection;
			})
		);
	};

	const handleDelete = (id) => {
		const updatedCart = cart.filter((item) => item.id !== id);
		setCart(updatedCart);

		// Update localStorage
		localStorage.setItem("cart", JSON.stringify(updatedCart));

		toast.success("Product removed from cart", {
			position: "top-right",
			autoClose: 400,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	const handleDeleteSelected = async () => {
		const result = await Swal.fire({
			title: "Are you sure?",
			text: "This action cannot be undone!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, remove them!",
			cancelButtonText: "Cancel",
		});

		if (result.isConfirmed) {
			try {
				// Filter out checked items from the cart
				const updatedCart = cart.filter(
					(item) => !checkedItems.includes(item.id)
				);
				setCart(updatedCart);

				// Update localStorage
				localStorage.setItem("cart", JSON.stringify(updatedCart));

				// Clear the selection
				setCheckedItems([]);
				setSelectAll(false);

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

	const selectAllItems = (event) => {
		const isChecked = event.target.checked;
		setSelectAll(isChecked);
		if (isChecked) {
			setCheckedItems(cart.map((item) => item.id));
		} else {
			setCheckedItems([]);
		}
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
				<div className="container">
					<div className="nk-content-inner">
						<div className="nk-content-body">
							<div className="nk-block-head nk-block-head-sm">
								<div className="nk-block-between">
									<div className="nk-block-head-content">
										<h3 className="nk-block-title page-title">Menu</h3>
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
																placeholder="Quick search by name"
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
													<li
														data-bs-toggle="modal"
														data-bs-target="#modalTop"
														className="nk-block-tools-opt"
													>
														<a
															href="#"
															data-target="addProduct"
															className="toggle btn btn-icon btn-primary d-md-none"
														>
															<em className="icon ni ni-cart"></em>
														</a>
														<a
															href="#"
															data-target="addProduct"
															className="toggle btn btn-primary d-none d-md-inline-flex"
														>
															<em className="icon ni ni-cart"></em>
															<span>View Cart</span>
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<form>
								<div className="nk-block">
									<div className="row g-gs">
										{filteredSelections.map(({ selection, originalIndex }) => (
											<div
												key={selection.id}
												className="col-xxl-3 col-lg-4 col-sm-6"
											>
												<div className="card card-bordered product-card">
													<div className="product-thumb">
														<a href="#">
															<img
																className="card-img-top"
																src={selection.image}
																alt={selection.name}
															/>
														</a>
														<ul className="product-badges">
															<li>
																<span className="badge bg-success">
																	{selection.quantityInStock > 0
																		? "In Stock"
																		: "Out of Stock"}
																</span>
															</li>
														</ul>
														<ul className="product-actions">
															<li>
																<a href="#">
																	<em className="icon ni ni-heart"></em>
																</a>
															</li>
														</ul>
													</div>
													<div className="card-inner">
														<h5 className="product-title">{selection.name}</h5>
														<ul className="preview-list d-flex justify-content-between">
															<li className="preview-item">
																<span className="badge bg-outline-danger">
																	&#x20B1;
																	{Number(selection.selectedPrice).toFixed(2)}
																</span>
															</li>
															<li className="preview-item">
																<span className="badge bg-outline-info">
																	Stock: {selection.quantityInStock}
																</span>
															</li>
														</ul>
														{selection.category === "Ethernet Cable" && (
															<>
																<p className="m-0">Specification:</p>
																<ul className="product-tags d-flex flex-wrap">
																	{[10, 20, 30, 40, 50, 100].map((length) => (
																		<button
																			key={length}
																			type="button"
																			className={`btn btn-sm ${
																				selection.selectedLength === length
																					? "btn-primary"
																					: "btn-outline-primary"
																			}`}
																			onClick={() =>
																				handleLengthSelection(
																					originalIndex,
																					length
																				)
																			}
																			style={{ margin: "3px" }} // Adds small space between buttons
																		>
																			{length} m
																		</button>
																	))}
																</ul>
															</>
														)}
														<div className="mt-1 d-flex justify-content-between">
															<div className="preview-title">Quantity:</div>
															<div className="btn-group btn-group-sm">
																<button
																	onClick={() =>
																		handleQuantityChange(originalIndex, -1)
																	}
																	type="button"
																	className="btn btn-outline-primary"
																	disabled={selection.quantity === 1}
																>
																	-
																</button>
																<button
																	type="button"
																	className="btn btn-outline-primary"
																>
																	{selection.quantity}
																</button>
																<button
																	onClick={() =>
																		handleQuantityChange(originalIndex, 1)
																	}
																	type="button"
																	className="btn btn-outline-primary"
																>
																	+
																</button>
															</div>
														</div>
														<button
															className="btn btn-primary btn-block mt-3"
															type="button"
															onClick={() => addProductToCart(selection)}
															disabled={selection.quantityInStock === 0}
														>
															{selection.quantityInStock === 0
																? "Out of Stock"
																: "Add to Cart"}
														</button>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</form>
							<div className="modal fade" tabIndex="-1" id="modalTop">
								<div
									className="modal-dialog modal-lg modal-dialog-top"
									role="document"
								>
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">Cart</h5>
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
											<div className="nk-tb-list is-separate mb-3">
												<div className="nk-tb-item nk-tb-head">
													<div className="nk-tb-col nk-tb-col-check">
														<div className="custom-control custom-control-sm custom-checkbox notext">
															<input
																type="checkbox"
																className="custom-control-input"
																id="pid"
																checked={selectAll}
																onChange={selectAllItems}
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
														<span>Length</span>
													</div>
													<div className="nk-tb-col">
														<span>Price</span>
													</div>
													<div className="nk-tb-col">
														<span>Quantity</span>
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
																					checkedItems.length === 0
																						? "disabled"
																						: ""
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

												{cart.length === 0
													? "No items in cart"
													: cart.map((item, index) => (
															<div key={index} className="nk-tb-item">
																<div className="nk-tb-col nk-tb-col-check">
																	<div className="custom-control custom-control-sm custom-checkbox notext">
																		<input
																			type="checkbox"
																			className="custom-control-input"
																			id={`pid-${item.id}`}
																			checked={checkedItems.includes(item.id)}
																			onChange={() =>
																				handleCheckboxChange(item)
																			}
																		/>
																		<label
																			className="custom-control-label"
																			htmlFor={`pid-${item.id}`}
																		></label>
																	</div>
																</div>
																<div className="nk-tb-col tb-col-sm">
																	<span className="tb-product">
																		<img
																			src={item.image}
																			alt={item.name}
																			className="thumb"
																		/>
																		<span className="title">{item.name}</span>
																	</span>
																</div>
																<div className="nk-tb-col">
																	<span className="tb-sub">
																		{item.category === "Ethernet Cable"
																			? `${item.selectedLength}m`
																			: "none"}
																	</span>
																</div>
																<div className="nk-tb-col">
																	<span className="tb-lead">
																	&#x20B1;{item.totalAmount.toFixed(2)}
																	</span>
																</div>
																<div className="nk-tb-col">
																	<span className="tb-sub">
																		{item.quantity}
																	</span>
																</div>
																<div className="nk-tb-col tb-col-md">
																	<span className="tb-sub">
																		{item.category}
																	</span>
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
																						<li>
																							<a href="#">
																								<em className="icon ni ni-edit"></em>
																								<span>Edit Product</span>
																							</a>
																						</li>
																						<li>
																							<a>
																								<em className="icon ni ni-eye"></em>
																								<span>View Product</span>
																							</a>
																						</li>
																						<li>
																							<a href="#">
																								<em className="icon ni ni-activity-round"></em>
																								<span>Product Orders</span>
																							</a>
																						</li>
																						<li
																							onClick={() =>
																								checkedItems.length > 0 &&
																								handleDelete(item.id)
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
												))}
											</div>
										</div>
										<div className="modal-footer bg-light">
											<span className="sub-text">
												Selected Total: ${" "}
												{cart
													.filter((item) => checkedItems.includes(item.id))
													.reduce((total, item) => total + item.totalAmount, 0)
													.toFixed(2)}
											</span>
											<button className="btn btn-primary">Print Payment</button>
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

export default Pos;

import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firestore";

import Swal from "sweetalert2";

const Modal = ({ getProducts, products }) => {
	const [name, setName] = useState("");
	const [model, setModel] = useState("");
	const [manufacturer, setManufacturer] = useState("");
	const [description, setDescription] = useState("none");
	const [price, setPrice] = useState();
	const [quantityInStock, setQuantityInStock] = useState();
	const [image, setImage] = useState("");
	const [category, setCategory] = useState("Uncategorized");

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (
			!name ||
			!model ||
			!manufacturer ||
			!price ||
			!quantityInStock ||
			!category
		) {
			return Swal.fire({
				icon: "error",
				title: "Error!",
				text: "All fields are required.",
				showConfirmButton: true,
			});
		}

		const newProduct = {
			name,
			model,
			description,
			manufacturer,
			price,
			quantityInStock,
			image,
			category,
		};

		products.push(newProduct);

		try {
			await addDoc(collection(db, "products"), {
				...newProduct,
			});

			const modalElement = document.getElementById("modalForm");
			const modalInstance = bootstrap.Modal.getInstance(modalElement);
			modalInstance.hide();

			Swal.fire({
				icon: "success",
				title: "Success!",
				text: "Product added successfully.",
				showConfirmButton: true,
			});

			setName("");
			setModel("");
			setManufacturer("");
			setDescription("none");
			setPrice("");
			setQuantityInStock("");
			setImage("");
			setCategory("Uncategorized");
		} catch (error) {
			console.log("Error adding document: ", error);
		}
		getProducts();
	};

	const categories = [
		"Case",
		"CPU Cooler",
		"CPU",
		"Ethernet Cable",
		"Headphones",
		"Internal Hard Drive",
		"Keyboard",
		"Memory",
		"Monitor",
		"Motherboard",
		"Mouse",
		"Power Supply",
	];

	const handleCategoryChange = (category) => {
		setCategory(category);
	};

	return (
		<>
			<button
				type="button"
				className="toggle btn btn-primary d-none d-md-inline-flex"
				data-bs-toggle="modal"
				data-bs-target="#modalForm"
			>
				<em className="icon ni ni-plus"></em>
				<span>Add Product</span>
			</button>

			<div className="modal fade" id="modalForm">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Product Info</h5>
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
								onSubmit={handleFormSubmit}
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
											onChange={(e) => setQuantityInStock(e.target.value)}
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
											value={image}
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
										<button type="submit" className="btn btn-lg btn-primary">
											Save Information
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;

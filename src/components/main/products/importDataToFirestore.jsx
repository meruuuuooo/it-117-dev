import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firestore"; // Adjust the import path as necessary
import Swal from "sweetalert2";
import { useEffect } from "react";

// Sample data array
const productData = [
	{
		name: "AMD Ryzen 7 7800X3D",
		model: "Ryzen 7 7800X3D",
		description:
			"8-core, 16-thread CPU with 4.2 GHz base clock and 5 GHz boost clock.",
		manufacturer: "AMD",
		price: 339,
		quantityInStock: 50,
		image: "public/images/cpu/1.jpg",
		category: "CPU",
	},
	{
		name: "AMD Ryzen 5 7600X",
		model: "Ryzen 5 7600X",
		description:
			"6-core, 12-thread CPU with 4.7 GHz base clock and 5.3 GHz boost clock.",
		manufacturer: "AMD",
		price: 204.99,
		quantityInStock: 75,
		image: "public/images/cpu/2.jpg",
		category: "CPU",
	},
	{
		name: "AMD Ryzen 5 5600X",
		model: "Ryzen 5 5600X",
		description:
			"6-core, 12-thread CPU with 3.7 GHz base clock and 4.6 GHz boost clock.",
		manufacturer: "AMD",
		price: 144.31,
		quantityInStock: 120,
		image: "public/images/cpu/3.jpg",
		category: "CPU",
	},
	{
		name: "AMD Ryzen 5 7600",
		model: "Ryzen 5 7600",
		description:
			"6-core, 12-thread CPU with 3.8 GHz base clock and 5.1 GHz boost clock.",
		manufacturer: "AMD",
		price: 185,
		quantityInStock: 100,
		image: "public/images/cpu/4.jpg",
		category: "CPU",
	},
	{
		name: "Intel Core i9-14900K",
		model: "Core i9-14900K",
		description:
			"24-core, 32-thread CPU with 3.2 GHz base clock and 6 GHz boost clock.",
		manufacturer: "Intel",
		price: 544.99,
		quantityInStock: 30,
		image: "public/images/cpu/5.jpg",
		category: "CPU",
	},
	{
		name: "Intel Core i7-14700K",
		model: "Core i7-14700K",
		description:
			"20-core, 28-thread CPU with 3.4 GHz base clock and 5.6 GHz boost clock.",
		manufacturer: "Intel",
		price: 399.99,
		quantityInStock: 60,
		image: "public/images/cpu/6.jpg",
		category: "CPU",
	},
	{
		name: "Intel Core i5-12400F",
		model: "Core i5-12400F",
		description:
			"6-core, 12-thread CPU with 2.5 GHz base clock and 4.4 GHz boost clock.",
		manufacturer: "Intel",
		price: 128,
		quantityInStock: 90,
		image: "public/images/cpu/7.jpg",
		category: "CPU",
	},
	{
		name: "AMD Ryzen 5 3600",
		model: "Ryzen 5 3600",
		description:
			"6-core, 12-thread CPU with 3.6 GHz base clock and 4.2 GHz boost clock.",
		manufacturer: "AMD",
		price: 84,
		quantityInStock: 150,
		image: "public/images/cpu/8.jpg",
		category: "CPU",
	},
	{
		name: "AMD Ryzen 7 7700X",
		model: "Ryzen 7 7700X",
		description:
			"8-core, 16-thread CPU with 4.5 GHz base clock and 5.4 GHz boost clock.",
		manufacturer: "AMD",
		price: 288.81,
		quantityInStock: 70,
		image: "public/images/cpu/9.jpg",
		category: "CPU",
	},
	{
		name: "AMD Ryzen 9 7950X3D",
		model: "Ryzen 9 7950X3D",
		description:
			"16-core, 32-thread CPU with 4.2 GHz base clock and 5.7 GHz boost clock.",
		manufacturer: "AMD",
		price: 564,
		quantityInStock: 40,
		image: "public/images/cpu/10.jpg",
		category: "CPU",
	},
];

// Function to safely import data into Firestore with duplication check
async function importDataToFirestore() {
	const collectionRef = collection(db, "products");

	try {
		for (const product of productData) {
			// Check if the product already exists by name and model
			const q = query(
				collectionRef,
				where("name", "==", product.name),
				where("model", "==", product.model)
			);
			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				// Add the product if it doesn't already exist
				await addDoc(collectionRef, product);
				console.log(`Successfully added: ${product.name}`);
			} else {
				console.log(`Product already exists: ${product.name}`);
			}
		}
		Swal.fire({
			icon: "success",
			title: "Data Import Completed",
			text: "Products have been imported to Firestore.",
		});
	} catch (error) {
		console.error("Error importing data: ", error);
		Swal.fire({
			icon: "error",
			title: "Import Failed",
			text: "An error occurred while importing data.",
		});
	}
}

// React component with Import Data button
const ImportDataButton = ({ getProducts }) => {
	useEffect(() => {
		getProducts();
	}, [getProducts]);

	return (
		<button onClick={importDataToFirestore} className="btn btn-primary">
			Import Products to Firestore
		</button>
	);
};

export default ImportDataButton;

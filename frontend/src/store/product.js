import { set } from "mongoose";
import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price || !newProduct.series || !newProduct.description) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	fetchProducts: async () => {
		const res = await fetch("/api/products");
		const data = await res.json();
		set({ products: data.data });
	},
	fetchSeries1: async () => {
		const res = await fetch("/api/products/series1");
		const data = await res.json();
		if (data.success) {
		  set({ products: data.data }); // Update the store with the fetched data
		} else {
		  console.error("Failed to fetch Series 1 products");
		}
	  },
	  fetchSeries2: async () => {
		const res = await fetch("/api/products/series2");
		const data = await res.json();
		if (data.success) {
		  set({ products: data.data }); // Update the store with the fetched data
		} else {
		  console.error("Failed to fetch Series 2 products");
		}
	  },
	  fetchSeries3: async () => {
		const res = await fetch("/api/products/series3");
		const data = await res.json();
		if (data.success) {
		  set({ products: data.data }); // Update the store with the fetched data
		} else {
		  console.error("Failed to fetch Series 3 products");
		}
	  },
	deleteProduct: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch (`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
			});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set	((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));
		return { success: true, message: data.message };
	},
}));

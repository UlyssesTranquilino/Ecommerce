import { create } from "zustand";

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
  rating: number;
  ratingCount: number;
}

interface ProductStoreState {
  products: Product[];
  wishlists: Product[];
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  updateProduct: (
    productId: string,
    updatedProduct: Partial<Product>
  ) => Promise<{ success: boolean; message: string }>;

  fetchWishlists: () => Promise<void>;
  setWishlists: (products: Product[]) => void;
  addToWishlist: (
    newWIshlist: Partial<Product>
  ) => Promise<{ success: boolean; message: string }>;
  deleteWishlist: (
    productId: string
  ) => Promise<{ success: boolean; message: string }>;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  products: [],

  wishlists: [],

  setWishlists: (products) => set({ products }),

  setProducts: (products) => set({ products }),

  updateProduct: async (productID, updatedProduct) => {
    try {
      const res = await fetch(`http://localhost:5000/${productID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        // If the response status is not OK (e.g., 4xx or 5xx), throw an error
        const error = await res.json();
        throw new Error(error.message || "Failed to update product");
      }

      const data = await res.json();

      // Update the local state with the updated product
      set((state) => ({
        products: state.products.map((product) =>
          product._id === productID
            ? { ...product, ...updatedProduct }
            : product
        ),
      }));

      return { success: true, message: "Product updated successfully!" };
    } catch (error) {
      console.error("Error updating product:", error);
      return {
        success: false,
        message: (error as Error).message || "An unexpected error occurred",
      };
    }
  },

  fetchProducts: async () => {
    const res = await fetch("http://localhost:5000/");
    const data = await res.json();
    set({ products: data.data });
  },

  fetchWishlists: async () => {
    const res = await fetch("http://localhost:5000/api/wishlist");
    const data = await res.json();
    set({ wishlists: data.data });
  },

  addToWishlist: async (newWishlist) => {
    try {
      const res = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWishlist),
      });

      if (!res.ok) {
        // If the response status is not OK (e.g., 4xx or 5xx), throw an error
        const error = await res.json();
        throw new Error(error.message || "Failed to add to wishlist");
      }

      const data = await res.json();
      set((state) => ({ wishlists: [...state.products, data.data] }));
      return { success: true, message: "Product added to wishlist!" };
    } catch (error) {
      // Handle any error that occurs
      console.error("Error adding to wishlist:", error);
      return {
        success: false,
        message: (error as Error).message || "An unexpected error occurred",
      };
    }
  },

  deleteWishlist: async (productId) => {
    const res = await fetch(`http://localhost:5000/api/wishlist/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      wishlists: state.wishlists.filter((product) => product._id !== productId),
    }));
    return { success: true, message: data.message };
  },
}));

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

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  carts: Product[];
  wishlists: Product[];
}

interface ProductStoreState {
  products: Product[];
  allUsers: User[];
  user: User;
  setUser: (user: User) => void;
  setAllUsers: (users: User[]) => void;
  fetchUser: () => Promise<void>;
  updateUser: (
    UserId: string,
    updatedUser: Partial<User>
  ) => Promise<{ success: boolean; message: string }>;

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
  allUsers: [],
  wishlists: [],

  user: {
    _id: "",
    name: "",
    email: "",
    password: "",
    carts: [],
    wishlists: [],
  },

  setUser: (user) => set({ user }),
  setAllUsers: (users) => set({ allUsers: users }),

  fetchUser: async () => {
    const res = await fetch("http://localhost:5000/api/user");
    const data = await res.json();
    set({ user: data.data });
  },
  updateUser: async (userId, updatedUser) => {
    try {
      const res = await fetch(`http://localhost:5000/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update user");
      }

      const data = await res.json();

      set((state) => ({ user: { ...state.user, ...updatedUser } }));
      set((state) => ({
        allUsers: state.allUsers.map((user) =>
          user._id === userId ? { ...user, ...updatedUser } : user
        ),
      }));

      return { success: true, message: "User updated" };
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        success: false,
        message: (error as Error).message || "An unexpected error occurred",
      };
    }
  },

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

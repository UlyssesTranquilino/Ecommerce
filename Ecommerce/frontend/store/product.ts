//USER PERSIST

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface Product {
  success: unknown;
  data: any;
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
  password?: string;
  carts: Product[];
  wishlists: Product[];
}

interface ProductStoreState {
  products: Product[];

  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  fetchSingleProduct: (productId: string) => Promise<Product>;
  updateProduct: (
    productId: string,
    updatedProduct: Partial<Product>
  ) => Promise<{ success: boolean; message: string }>;

  addUser: (
    newUser: Partial<User>
  ) => Promise<{ success: boolean; message: string }>;
}

export const useProductStore = create<ProductStoreState>((set, get) => ({
  products: [],
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
  fetchSingleProduct: async (productId) => {
    const res = await fetch(`http://localhost:5000/${productId}`);
    const data = await res.json();
    return data;
  },

  // The addUser action, properly defined
  addUser: async (newUser) => {
    try {
      const res = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      // Handle errors returned from the backend (e.g., validation errors)
      if (data.errors) {
        let messages = "";
        if (data.errors.name) messages += data.errors.name.message + ".";
        if (data.errors.email) messages += data.errors.email.message + ". ";
        if (data.errors.password)
          messages += data.errors.password.message + ". ";

        throw new Error(messages || "Failed to add user");
      }

      return { success: true, message: "User added successfully!" };
    } catch (error) {
      console.error("Error adding user:", error);
      return {
        success: false,
        message: (error as Error).message || "An unexpected error occurred",
      };
    }
  },
}));

// User Store with persist
export const useUserStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      setCurrentUser: (user: any) => set({ currentUser: user }),
      addUserWishlist: async (product: any) => {
        const currentUser = get().currentUser;

        console.log("ZUSTAND CURRENT USER: ", currentUser);

        if (!currentUser) {
          console.error("No user logged in");
          return { success: false, message: "FAILED ADDING TO WISHLIST" };
        }

        try {
          const response = await fetch(
            `http://localhost:5000/user/wishlist/${currentUser.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(product),
            }
          );

          const result = await response.json();

          if (!response.ok) {
            console.error("Error adding to wishlist:", result.message);
            return;
          }

          set({
            currentUser: { ...currentUser, wishlists: result.data.wishlist },
          });
          console.log(result.message);
          return { success: true, message: "PRODUCT ADDED TO WISHLIST!" };
        } catch (error) {
          console.error("Error adding to wishlist:", error);
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

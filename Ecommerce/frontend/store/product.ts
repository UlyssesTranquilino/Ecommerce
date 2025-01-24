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

interface Cart {
  _id: string;
  price: number;
  quantity: number;
  model: string;
  color: string;
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

const normalizeUser = (user: any) => {
  if (user && user.id && !user._id) {
    user._id = user.id; // Copy `id` to `_id` for consistency.
    delete user.id; // Optionally remove `id` to avoid confusion.
  }
  return user;
};

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
    (set: any, get: () => { currentUser: User | null }) => ({
      currentUser: null,
      setCurrentUser: (user: any) => set({ currentUser: user }),
      updateUser: async (user: any) => {
        try {
          const res = await fetch(`http://localhost:5000/user/${user._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Failed to update user");
          }

          const data = await res.json();
          console.log("DATA: ", data);

          // set({ currentUser: data.data });

          return { success: data.success, message: data.message };
        } catch (error) {
          console.error("Error updating user:", error);
          return {
            success: false,
            message: (error as Error).message || "An unexpected error occurred",
          };
        }
      },
      addUserWishlist: async (product: any) => {
        let currentUser: User | null = get()?.currentUser;
        currentUser = normalizeUser(currentUser);
        console.log("CURENT USER: ", currentUser);

        if (!currentUser) {
          console.error("No user logged in");
          return { success: false, message: "FAILED ADDING TO WISHLIST" };
        }

        try {
          const response = await fetch(
            `http://localhost:5000/user/wishlist/${currentUser._id}`,
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
            return {
              success: false,
              message: "PRODUCT ERROR ADDING TO WISHLIST!",
            };
          }

          set({
            currentUser: normalizeUser(result.data),
          });

          return { success: true, message: "PRODUCT ADDED TO WISHLIST!" };
        } catch (error) {
          console.error("Error adding to wishlist:", error);
        }
      },
      deleteUserWishlist: async (product: any) => {
        let currentUser: User | null = get()?.currentUser;
        currentUser = normalizeUser(currentUser);

        if (!currentUser) {
          console.error("No user logged in");
          return { success: false, message: "FAILED REMOVING FROM WISHLIST" };
        }

        try {
          const response = await fetch(
            `http://localhost:5000/user/wishlist/${currentUser._id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(product),
            }
          );

          const result = await response.json();

          console.log("RESULT DELETE: ", result);

          if (!response.ok) {
            console.error("Error deleting from wishlist:", result.message);
            return { success: false, message: result.message };
          }

          normalizeUser(result.wishlist);

          set({
            currentUser: { ...currentUser, wishlists: result.wishlist },
          });

          return { success: true, message: "PRODUCT REMOVED FROM WISHLIST!" };
        } catch (error) {
          console.error("Error removing from wishlist:", error);
          return { success: false, message: "An error occurred" };
        }
      },
      addUserCart: async (product: Cart) => {
        let currentUser: User | null = get()?.currentUser;
        currentUser = normalizeUser(currentUser);

        if (!currentUser) {
          console.error("Add to Cart Error: No user is currently logged in.");
          return {
            success: false,
            message: "You must be logged in to add items to your cart.",
          };
        }

        try {
          const response = await fetch(
            `http://localhost:5000/user/cart/${currentUser._id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(product),
            }
          );

          const result = await response.json();
          console.log("RESULT: ", result);

          if (!response.ok) {
            console.error("Add to Cart API Error:", result.message);
            return {
              success: false,
              message:
                "There was an error adding the product to your cart. Please try again later.",
            };
          }

          set({
            currentUser: normalizeUser(result.data),
          });

          return {
            success: true,
            message: "Product successfully added to your cart!",
          };
        } catch (error) {
          console.error("Add to Cart Request Failed:", error);
          return {
            success: false,
            message:
              "Unable to add the product to your cart due to a network or server error. Please try again later.",
          };
        }
      },
      deleteUserCart: async (productID: string[]) => {
        let currentUser: User | null = get()?.currentUser;
        currentUser = normalizeUser(currentUser);

        console.log("ZUSTAND ", JSON.stringify(productID));

        if (!currentUser) {
          console.error("No user logged in");
          return { success: false, message: "Failed removing from cart" };
        }

        try {
          const response = await fetch(
            `http://localhost:5000/user/cart/${currentUser._id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productID),
            }
          );

          const result = await response.json();
          console.log("RESULT DELETE: ", result);

          if (!response.ok) {
            console.error("Error deleting from cart:", result.message);
            return { success: false, message: result.message };
          }

          currentUser.carts = result.carts;

          set({
            currentUser: currentUser,
          });

          return { success: true, message: "PRODUCT REMOVED FROM WISHLIST!" };
        } catch (error) {
          console.error("Error removing from wishlist:", error);
          return { success: false, message: "An error occurred" };
        }
      },
      updateUserCart: async (product: Partial<Cart>) => {
        let currentUser: User | null = get()?.currentUser;
        currentUser = normalizeUser(currentUser);

        console.log("PARTIA: ", product);
        if (!currentUser) {
          console.error("No user logged in");
          return {
            success: false,
            message: "FAILED ADDING TO WISHLIST",
            updatedCart: currentUser ? (currentUser as User).carts : [],
          };
        }

        try {
          const response = await fetch(
            `http://localhost:5000/user/cart/${currentUser._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(product),
            }
          );

          const result = await response.json();
          console.log("RESULT FROM UPDATED: ", result);

          if (!response.ok) {
            console.error("Error adding to wishlist:", result.message);
            return {
              success: false,
              message: "PRODUCT ERROR UPDATING TO CART!",
              updatedCart: currentUser ? (currentUser as User).carts : [],
            };
          }

          set({
            currentUser: normalizeUser(result.data),
          });

          console.log("CURRENT USER: ", currentUser.carts);

          return {
            success: true,
            message: "Cart Updated Successfully",
            updatedCart: result.data.carts,
          };
        } catch (error) {
          console.error("Error updating cart:", error);
          return {
            success: false,
            message: "Failed to update cart due to a network error",
            updatedCart: currentUser.carts, // Return the current cart as a fallback
          };
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

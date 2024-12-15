import { create } from "zustand";

interface Product {
  _id: string;
  title: String;
  pictures: [];
  price: Number;
  discountedPrice?: Number;
  review?: String;
  numReview?: Number;
  isStock: Boolean;
  colors?: [];
  size?: [];
  quantity: Number;
  isWishlist: Boolean;
  category: String;
  shippingInfo: String;
  tags: String;
  discounts?: Number;
}

interface ProductStoreState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  fetchProducts: async () => {
    const res = await fetch("http://localhost:5000/");
    const data = await res.json();
    set({ products: data.data });
  },
}));

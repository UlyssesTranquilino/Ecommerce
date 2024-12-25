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

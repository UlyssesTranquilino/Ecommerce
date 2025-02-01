import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import WishlistPage from "./pages/WIshlistPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import AccountPage from "./pages/AccountPage";
import CartPage from "./pages/CartPage";
import SettingsPage from "./pages/SettingsPage";
import Search from "./pages/SearchPage";
import Dashboard from "./pages/Admin/Dashboard";

import { Route, Routes } from "react-router-dom";

import NotFound from "./pages/NotFound";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="light bg-bgPrimary">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account/settings" element={<SettingsPage />} />
        <Route path="/search/:searchItem" element={<Search />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/:id" element={<Dashboard />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

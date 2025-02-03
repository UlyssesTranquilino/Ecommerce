import { useState, useEffect, useMemo, useRef } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useProductStore } from "../../../store/product";
import { Link } from "react-router-dom";

//MUI
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//ICONS
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

//GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

//TOASTER
import toast, { Toaster } from "react-hot-toast";

//SKELETON
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminAllProducts = () => {
  const { products, fetchProducts, deleteProduct } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      setAllProducts([...useProductStore.getState().products]); // Get the latest state
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...(allProducts || [])];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (sortConfig.key && a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (sortConfig.key && a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [allProducts, sortConfig]);

  const handleSort = (sortColumn: string) => {
    let direction = "asc";
    if (sortConfig.key === sortColumn && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: sortColumn, direction });
  };

  function capitalizeFirstLetter(word: string) {
    if (!word) return word; // Handle empty strings
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  //Search
  const [searchProduct, setSearchProduct] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filteredProducts = products.filter(
      (product: any) =>
        (product?.title ?? "")
          .toLowerCase()
          .includes(searchProduct?.toLowerCase() ?? "") ||
        (product?.brand ?? "")
          .toLowerCase()
          .includes(searchProduct?.toLowerCase() ?? "") ||
        (product?.category ?? "")
          .toLowerCase()
          .includes(searchProduct?.toLowerCase() ?? "")
    );
    setAllProducts(filteredProducts);
  };

  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: container });

  useEffect(() => {
    if (searchProduct.length > 0) showSearchAnimation();
    else closeSearch();
  }, [searchProduct]);

  const showSearchAnimation = contextSafe(() => {
    gsap.to(".btn-close", {
      opacity: 1,
      duration: 0.3,
      scale: 1.1,
      ease: "power2.inOut",
    });
  });

  function closeSearch() {
    gsap.to(".btn-close", {
      opacity: 0,
      duration: 0.3,
      scale: 1,
      ease: "power2.inOut",
    });
  }

  //Modal
  const [open, setOpen] = useState(false);
  const [currProductID, setCurrProductID] = useState("");
  const handleOpen = (productID: string) => {
    setOpen(true);
    setCurrProductID(productID);
  };
  const handleClose = () => setOpen(false);

  const handleDeleteProduct = async () => {
    const { success, message } = await deleteProduct(currProductID);
    console.log(success, "  ", message);
    toast(message);
    setCurrProductID("");
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  //Edit Modal
  const [editOpen, setEditOpen] = useState(false);

  //Edit Product Details
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [stockQuantity, setStockQuantity] = useState<number>(1);
  const [image, setImage] = useState<string>();

  const toggleCategory = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setCategory(selectedValue);
  };

  const handleEditOpen = (product: any) => {
    setEditOpen(true);

    console.log(product);

    setProductName(product.title);
    setPrice(product.price);
    setDescription(product.description);
    setBrand(product.brand);
    setModel(product.model);
    setColor(product.color);
    setCategory(product.category);
    setStockQuantity(product.stock);
    setImage(product.image);
  };

  const handleEditClose = () => setEditOpen(false);

  const handleEditProduct = () => {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("TOGG");
    if (
      !productName ||
      !price ||
      !description ||
      !category ||
      stockQuantity == 0 ||
      !image
    ) {
      return;
    }
  };

  return (
    <div className="relative max-w-[1200px] m-auto p-4 mt-10">
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "white",
            color: "black",
          },
        }}
      />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-md">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this product?
            </Typography>
            <div className="mt-8 flex justify-end gap-5">
              <button
                className="hover:bg-gray-100 px-5 p-2"
                onClick={handleClose}
              >
                No
              </button>
              <button
                className="hover:bg-gray-100 px-5 p-2"
                style={{ color: "red" }}
                onClick={handleDeleteProduct}
              >
                Yes
              </button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            className="w-[90%] max-w-[1200px] bg-white overflow-auto m-auto p-5 h-[500px] mt-20 drop-shadow-sm rounded-md"
            style={{ boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="mt-3 flex items-center gap-2 mb-10">
              <div className="w-3 h-10 bg-[#DB4444]" />
              <h1 className="text-redAccent font-semibold text-xl">
                Edit Product
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="productName">Product Name</label>
                <input
                  required
                  type="text"
                  placeholder="Enter Product Name"
                  name="text"
                  id="productName"
                  className="bg-gray-100 px-3 border-b-2 w-[100%] py-2 focus:border-redAccent focus:outline-none text-[16px] mt-2"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="productName">Price</label>
                <div>
                  $
                  <input
                    required
                    type="number"
                    step="any"
                    placeholder="Enter Price"
                    name="text"
                    id="price"
                    className="bg-gray-100 px-3 border-b-2 w-[40%] py-2 ml-1 focus:border-redAccent focus:outline-none text-[16px] mt-2"
                    onChange={(e) => setPrice(Number(e.target.value))}
                    value={price !== null ? price : ""}
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="productName">Description</label>

                <textarea
                  required
                  placeholder="Enter Description"
                  className="h-52 bg-gray-100 border-b-2 w-[100%] py-2 px-3 focus:border-redAccent focus:outline-none text-[16px] mt-2"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>

              <div>
                <label htmlFor="productName">Brand</label>
                <input
                  type="text"
                  placeholder="Enter Brand"
                  name="text"
                  id="productName"
                  className="bg-gray-100 px-3 border-b-2 w-[100%] py-2 focus:border-redAccent focus:outline-none text-[16px] mt-2"
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                />
              </div>

              <div>
                <label htmlFor="productName">Model</label>
                <input
                  type="text"
                  placeholder="Enter Model"
                  name="text"
                  id="productName"
                  className="bg-gray-100 px-3 border-b-2 w-[100%] py-2 focus:border-redAccent focus:outline-none text-[16px] mt-2"
                  onChange={(e) => setModel(e.target.value)}
                  value={model}
                />
              </div>

              <div>
                <label htmlFor="productName">Color</label>
                <input
                  type="text"
                  placeholder="Enter Color"
                  name="text"
                  id="productName"
                  className="bg-gray-100 px-3 border-b-2 w-[100%] py-2 focus:border-redAccent focus:outline-none text-[16px] mt-2"
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                />
              </div>

              <div>
                <label htmlFor="productName">Category</label>

                <div className="mt-2">
                  <FormControl sx={{ m: 0, minWidth: 180 }} size="small">
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={category}
                      onChange={toggleCategory}
                      displayEmpty // Ensures the placeholder is shown when no value is selected
                      sx={{
                        backgroundColor: "#f3f4f6",
                        color: "black",
                        margin: 0,
                        padding: 0,
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSelect-icon": {
                          color: "black",
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Pick Category
                      </MenuItem>
                      <MenuItem value="mobile">Mobile</MenuItem>
                      <MenuItem value="laptop">Laptop</MenuItem>
                      <MenuItem value="audio">Audio</MenuItem>
                      <MenuItem value="gaming">Gaming</MenuItem>
                      <MenuItem value="tv">TV</MenuItem>
                      <MenuItem value="appliances">Appliances</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="productName">Stock Quantity</label>
                <input
                  required
                  type="number"
                  placeholder="Enter Quantity"
                  name="text"
                  id="productName"
                  className="bg-gray-100 px-3 border-b-2 w-[30%] py-2 focus:border-redAccent focus:outline-none text-[16px] mt-2"
                  onChange={(e) => setStockQuantity(Number(e.target.value))}
                  value={stockQuantity}
                  min="1"
                />
              </div>

              <div>
                <label htmlFor="productName">Image</label>

                <input
                  required
                  type="text"
                  placeholder="Enter image link"
                  name="text"
                  id="productName"
                  className="bg-gray-100 px-3 border-b-2 w-[100%] py-2 focus:border-redAccent focus:outline-none text-[16px] mt-2"
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />

                {image && (
                  <img
                    src={image}
                    alt={productName}
                    className="w-[100%] max-w-[500px] mt-10"
                  />
                )}
              </div>

              <button
                type="submit"
                className=" mt-6 bg-redAccent text-white flex items-center justify-center h-12 rounded-sm w-[100%] max-w-[450px] m-auto"
              >
                <AddCircleOutlineOutlinedIcon />
                <p className="ml-2"> Create Product</p>
              </button>
            </form>
          </div>
        </Modal>
      </div>

      <div className="font-semibold text-xl">Admin Dashboard</div>
      <div className="flex items-center gap-2 mg:gap-3 mt-3">
        <Link
          to="/admin/create-product/id"
          className=" px-1 xs:px-4 py-2  text-sm border transition-all bg-white text-black border-gray-400 hover:bg-gray-200"
        >
          Create Product
        </Link>

        <div className="cursor-pointer px-1 xs:px-4 py-2 text-sm border transition-all bg-[#DB4444] text-white border-[#DB4444]">
          All Products
        </div>
      </div>

      <div className="mt-10 flex items-center gap-2 mb-10">
        <div className="w-3 h-10 bg-redAccent" />
        <h1 className="text-redAccent font-semibold text-xl">All Products</h1>
      </div>

      <div
        className=" rounded-l-lg flex justify-between items-center bg-blue-gray-50"
        style={{ width: "100%", margin: "auto" }}
      >
        <input
          type="text"
          id="search"
          value={searchProduct}
          placeholder="Search for Product"
          onChange={(e) => setSearchProduct(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key press
          className="bg-blue-gray-50 h-9 w-4/5 focus:outline-none rounded-l-lg ml-5 mt-[3px]"
        ></input>

        <div className="flex items-center" ref={container}>
          <button
            onClick={() => {
              setSearchProduct("");
              closeSearch();
              setAllProducts(products); // Reset to all products when search is cleared
            }}
            className="btn-close w-4 h-4 mr-3 bg-gray-500 rounded-full flex items-center justify-center opacity-0"
          >
            <CloseIcon className="scale-50 text-white" />
          </button>

          <button
            onClick={handleSearch}
            className="bg-redAccent text-textPrimary w-12 sm:w-16 h-10 rounded-tr-md rounded-br-md "
          >
            <SearchIcon style={{ color: "white" }} />
          </button>
        </div>
      </div>

      {sortedProducts?.length > 0 ? (
        <div className="mt-10">
          {" "}
          <div className="overflow-y-auto">
            <table className="w-[100%] text-sm ">
              <thead className="uppercase bg-gray-100">
                <tr>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-10 py-2 ">
                      PRODUCT
                      <button
                        className="flex flex-col items-center"
                        onClick={() => handleSort("title")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "title" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "title" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>{" "}
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-4 py-2">
                      Price
                      <button
                        className="flex flex-col items-center"
                        onClick={() => handleSort("price")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "price" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "price" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-6 py-2">
                      BRAND
                      <button
                        className="flex flex-col items-center"
                        onClick={() => handleSort("brand")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "brand" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "brand" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-3 py-2">
                      MODEL
                      <button
                        className="flex flex-col items-center px-0"
                        onClick={() => handleSort("model")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "model" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "model" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-6 py-2">
                      CATEGORY
                      <button
                        className="flex flex-col items-center"
                        onClick={() => handleSort("category")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "category" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "category" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-4 py-2">
                      STOCK
                      <button
                        className="flex flex-col items-center"
                        onClick={() => handleSort("stock")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "stock" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "stock" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-8 py-2">
                      ACTION
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700">
                    <td className="pr-2 py-2">
                      <div className="grid grid-cols-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-24 col-span-1"
                        />
                        <p className="col-span-2">{product.title}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2">${product.price}</td>
                    <td className="px-6 py-2">
                      {capitalizeFirstLetter(product.brand)}
                    </td>
                    <td className="px-2 py-2">{product.model}</td>
                    <td className="px-6 py-2">
                      {capitalizeFirstLetter(product.category)}
                    </td>
                    <td className="px-4 py-2">{product.stock}</td>
                    <td className="px-8 py-2 flex flex-col gap-6 mt-2">
                      <button
                        className=" flex items-center gap-1  hover:bg-gray-50 p-2"
                        onClick={() => handleEditOpen(product)}
                      >
                        Edit
                        <EditIcon fontSize="small" />
                      </button>
                      <button
                        className="text-red-500 flex items-center gap-1 hover:bg-red-50 p-2"
                        onClick={() => handleOpen(product._id)}
                      >
                        Delete
                        <DeleteOutlineIcon fontSize="small" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : !loading ? (
        <div>No Products Found</div>
      ) : (
        <div className="mt-10">
          {" "}
          <div className="overflow-y-auto">
            <table className="w-[100%] text-sm ">
              <thead className="uppercase bg-gray-100">
                <tr>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-10 py-2 ">
                      PRODUCT
                      <button className="flex flex-col items-center">
                        <ArrowDropUpIcon className="w-2 -mb-2" />
                        <ArrowDropDownIcon className="w-2 -mt-2" />
                      </button>
                    </div>{" "}
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-4 py-2">
                      Price
                      <button className="flex flex-col items-center">
                        <ArrowDropUpIcon className="w-2 -mb-2" />
                        <ArrowDropDownIcon className="w-2 -mt-2" />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-6 py-2">
                      BRAND
                      <button className="flex flex-col items-center">
                        <ArrowDropUpIcon className="w-2 -mb-2" />
                        <ArrowDropDownIcon className="w-2 -mt-2" />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-3 py-2">
                      MODEL
                      <button className="flex flex-col items-center px-0">
                        <ArrowDropUpIcon className="w-2 -mb-2" />
                        <ArrowDropDownIcon className="w-2 -mt-2" />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-6 py-2">
                      CATEGORY
                      <button className="flex flex-col items-center">
                        <ArrowDropUpIcon className="w-2 -mb-2" />
                        <ArrowDropDownIcon className="w-2 -mt-2" />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-4 py-2">
                      STOCK
                      <button className="flex flex-col items-center">
                        <ArrowDropUpIcon className="w-2 -mb-2" />
                        <ArrowDropDownIcon className="w-2 -mt-2" />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-8 py-2">
                      ACTION
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, index) => (
                  <tr
                    key={`skeleton-${index + length}`}
                    className="border-b border-gray-700"
                  >
                    <td className="pr-2">
                      <div className="grid grid-cols-3 gap-1">
                        <Skeleton
                          height={90}
                          width="110%"
                          className="mt-2 col-span-1"
                        />
                        <div className="col-span-2 pl-2">
                          <Skeleton
                            height={15}
                            width="100%"
                            className="mt-2 "
                          />
                          <Skeleton height={15} width="90%" className="mt-2" />
                          <Skeleton height={15} width="60%" className="mt-2" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      {" "}
                      <Skeleton height={20} width="50%" className="mt-2" />
                    </td>
                    <td className="px-6 py-2">
                      <Skeleton height={20} width="70%" className="mt-2" />
                    </td>
                    <td className="px-2 py-2">
                      {" "}
                      <Skeleton height={20} width="70" className="mt-2" />
                    </td>
                    <td className="px-6 py-2">
                      <Skeleton height={20} width="60%" className="mt-2" />
                    </td>
                    <td className="px-4 py-2">
                      {" "}
                      <Skeleton height={20} width="45%" className="mt-2" />
                    </td>
                    <td className="px-8 py-2 flex flex-col gap-6 mt-2 pb-3">
                      <Skeleton height={20} width="70%" className="mt-2" />
                      <Skeleton height={20} width="70%" className="mt-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllProducts;

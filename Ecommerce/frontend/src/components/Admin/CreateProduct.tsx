import { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

//MUI
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useProductStore } from "../../../store/product";

//TOASTER
import toast, { Toaster } from "react-hot-toast";

import { Link, Route, Routes } from "react-router-dom";
const CreateProduct = () => {
  const { addProduct } = useProductStore();

  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [stockQuantity, setStockQuantity] = useState<number>(1);
  const [image, setImage] = useState<string>();

  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [toastMessage, setToastMessage] = useState<string>();

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
      setIsSuccess(false);
      setToastMessage("Please fill in all required fields");
      return;
    }

    const { success, message } = await addProduct({
      title: productName,
      image: image,
      price: price,
      description: description,
      brand: brand.toLowerCase(),
      model: model,
      stock: stockQuantity,
      category: category,
    });

    console.log(success);
    if (success) {
      toast(message);
      setProductName("");
      setPrice(0);
      setDescription("");
      setBrand("");
      setModel("");
      setColor("");
      setCategory("");
      setStockQuantity(1);
      setImage("");
    } else {
      toast(message);
    }

    console.log("Product Name: ", productName);
  };

  const toggleCategory = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setCategory(selectedValue);
  };
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "white",
            color: "black",
          },
        }}
      />

      <div className="mt-10 flex items-center gap-2 mb-10">
        <div className="w-3 h-10 bg-redAccent" />
        <h1 className="text-redAccent font-semibold text-xl">
          Create New Product
        </h1>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {/* <div>
            <label htmlFor="productName">Image</label>
            {image && (
              <img
                src={image.url}
                alt={image.name}
                className="w-[100%] max-w-[400px]"
              />
            )}
            <div className="flex flex-col">
              <input type="file" name="file" onChange={handleImage} />
            </div>
          </div> */}

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
    </div>
  );
};

export default CreateProduct;

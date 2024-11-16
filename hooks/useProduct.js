import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";

// Validation Schema
const productSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  category: Yup.string().required("Category is required"),
  sku: Yup.string().required("SKU is required"),
  originalPrice: Yup.number().required("Original price is required"),
  discount: Yup.number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
  productImage: Yup.string().required("Product image is required"),
});

const initialValues = {
  productName: "",
  category: "",
  sku: "",
  originalPrice: "",
  discount: "",
  productImage: null,
  index: 0,
};

const defaultFilter = {
  search: "",
  minPrice: "",
  maxPrice: "",
  sort: "asc",
  pageSize: 5,
  currentPage: 1,
};

const useProduct = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track which product to edit
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState(() => {
    return {
      ...defaultFilter,
      ...router.query, // Populate initial state from the query
    };
  });

  useEffect(() => {
    // Retrieve products from localStorage if they exist
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filter]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productSchema,
    onSubmit: (values) => {
      handleAddProduct(values);
      formik.resetForm();
    },
    enableReinitialize: true,
  });

  const applyFilters = () => {
    let filtered = [...products];

    // Search by name or category
    if (filter.search) {
      filtered = filtered.filter(
        (product) =>
          product.productName
            .toLowerCase()
            .includes(filter.search.toLowerCase()) ||
          product.category.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    const minPrice = Number(filter.minPrice) || 0;
    const maxPrice = Number(filter.maxPrice) || Infinity;

    if (minPrice || maxPrice) {
      filtered = filtered.filter(
        (product) =>
          (minPrice ? product.originalPrice >= minPrice : true) &&
          (maxPrice ? product.originalPrice <= maxPrice : true)
      );
    }

    if (filter.sort) {
      filteredProducts.sort((a, b) => {
        const priceA = Number(a.originalPrice);
        const priceB = Number(b.originalPrice);

        if (isNaN(priceA) || isNaN(priceB)) return 0;

        if (filter.sort === "asc") {
          return priceA - priceB; 
        } else if (filter.sort === "desc") {
          return priceB - priceA; 
        }
        return 0;
      });
    }

    const startIndex = (filter.currentPage - 1) * filter.pageSize;
    const endIndex = startIndex + filter.pageSize;

    const paginatedProducts = filtered.slice(startIndex, endIndex);

    setFilteredProducts(paginatedProducts);
  };

  const saveProductsToLocalStorage = (updatedProducts) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleAddProduct = (product) => {
    let updatedProducts = [...products];

    if (editIndex !== null) {
      updatedProducts[editIndex] = {
        ...product,
        finalPrice: calculateFinalPrice(product),
      };
      setEditIndex(null);
    } else {
      updatedProducts.push({
        ...product,
        finalPrice: calculateFinalPrice(product),
        index: updatedProducts.length + 1,
      });
    }

    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
  };

  const handleEditProduct = (index) => {
    setEditIndex(index);
    const editProductData = products[index];

    Object.keys(initialValues).forEach((key) => {
      formik.setFieldValue(key, editProductData[key]);
    });
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    formik.resetForm();
  };

  const calculateFinalPrice = (product) => {
    return (
      product.originalPrice - product.originalPrice * (product.discount / 100)
    );
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };
  const handlePaginationChange = (e) => {
    setFilter((prev) => ({ ...prev, currentPage: Number(e.target.value) }));
  };

  return {
    formik,
    filteredProducts,
    products,
    filter,
    editIndex,
    handleAddProduct,
    handleDeleteProduct,
    handleEditProduct,
    handleCancelEdit,
    handleFilterChange,
    handlePaginationChange,
    setFilter,
  };
};

export default useProduct;

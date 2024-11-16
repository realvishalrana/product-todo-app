import React from "react";
import InputField from "../Common/InputField";
import { useRouter } from "next/router";
import ImageUploader from "../Common/ImageUploader";
import routes from "@/utils/routes";

const ProductIndex = ({ formik, editIndex }) => {
  const router = useRouter();

  const navigateBack = () => {
    router.push(routes.product);
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {editIndex !== null ? "Edit Product" : "Add New Product"}
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <InputField
            isError
            isRequired
            formik={formik}
            id="productName"
            label="Product Name"
            inputName="productName"
            labelClass="text-sm font-medium text-gray-700"
            {...formik.getFieldProps("productName")}
          />
        </div>

        <div className="mb-4">
          <InputField
            isError
            isRequired
            formik={formik}
            id="category"
            label="Category Name"
            inputName="category"
            labelClass="text-sm font-medium text-gray-700"
            {...formik.getFieldProps("category")}
          />
        </div>

        <div className="mb-4">
          <InputField
            isError
            isRequired
            formik={formik}
            id="sku"
            label="Product SKU"
            inputName="sku"
            labelClass="text-sm font-medium text-gray-700"
            {...formik.getFieldProps("sku")}
          />
        </div>

        <div className="mb-4">
          <InputField
            isError
            isRequired
            formik={formik}
            type="number"
            id="originalPrice"
            label="Original Price"
            inputName="originalPrice"
            labelClass="text-sm font-medium text-gray-700"
            {...formik.getFieldProps("originalPrice")}
            isZeroNumberIncluded={false}
          />
        </div>

        <div className="mb-4">
          <InputField
            isError
            formik={formik}
            type="number"
            id="discount"
            label="Discount (%)"
            placeholder="Enter Discount"
            inputName="discount"
            labelClass="text-sm font-medium text-gray-700"
            {...formik.getFieldProps("discount")}
            isZeroNumberIncluded={false}
          />
        </div>

        <div className="mb-6">
          <ImageUploader
            id="productImage"
            label="Product Image"
            inputName="productImage"
            formik={formik}
            isRequired
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            {editIndex !== null ? "Update Product" : "Add Product"}
          </button>
        </div>
        <button
          type="button"
          onClick={navigateBack}
          className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-2"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default ProductIndex;

import React from "react";

const ProductList = ({
  products, // Assuming this is the full list of products
  filter,
  setFilter,
  handleEditProduct,
  handleDeleteProduct,
}) => {
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productName.toLowerCase().includes(filter.search.toLowerCase()) ||
      product.category.toLowerCase().includes(filter.search.toLowerCase());

    const matchesPriceRange =
      (filter.minPrice ? product.originalPrice >= filter.minPrice : true) &&
      (filter.maxPrice ? product.originalPrice <= filter.maxPrice : true);

    return matchesSearch && matchesPriceRange;
  });

  const totalPages = Math.ceil(filteredProducts.length / filter.pageSize);

  const handlePaginationChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setFilter({ ...filter, currentPage: page });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        {filteredProducts.length > 0 ? (
          <>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b border-gray-300">
                    Product Name
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-300">
                    Product Image
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-300">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-300">
                    SKU
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-300">
                    Original Price
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-300">
                    Discount
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-300">
                    Final Price
                  </th>
                  <th className="px-4 py-2 text-left border-b border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts
                  .slice(
                    (filter.currentPage - 1) * filter.pageSize,
                    filter.currentPage * filter.pageSize
                  )
                  .map((product, index) => (
                    <tr
                      key={product.sku + product.index}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{product.productName}</td>
                      <td className="px-4 py-2">
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2">{product.sku}</td>
                      <td className="px-4 py-2">{product.originalPrice}</td>
                      <td className="px-4 py-2">
                        {product.discount !== "" ? product.discount : 0}%
                      </td>
                      <td className="px-4 py-2">
                        {product.finalPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="text-blue-500 mr-2 hover:underline"
                          onClick={() => handleEditProduct(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleDeleteProduct(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-center items-center">
              <button
                onClick={() => handlePaginationChange(filter.currentPage - 1)}
                disabled={filter.currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50 mr-2"
              >
                Previous
              </button>

              <select
                value={filter.currentPage}
                onChange={(e) => handlePaginationChange(Number(e.target.value))}
                className="mr-2 p-2 border rounded bg-white"
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handlePaginationChange(filter.currentPage + 1)}
                disabled={filter.currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          "No Data Added in Product"
        )}
      </div>
    </div>
  );
};

export default ProductList;

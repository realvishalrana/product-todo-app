import { useRouter } from "next/router";
import ProductList from "@/components/Product/ProductList";
import useProduct from "@/hooks/useProduct";
import ProductFilter from "@/components/Product/Filter";
import HeaderWrapper from "@/components/HeaderWrapper";
import WithAuth from "@/hoc/WithAuth";
import routes from "@/utils/routes";

const ProductPage = () => {
  const {
    products,
    handleDeleteProduct,
    filter,
    handleFilterChange,
    handlePaginationChange,
    filteredProducts,
    setFilter,
  } = useProduct();
  const router = useRouter();

  const navigateToAddProduct = () => {
    router.push(routes.newProduct); 
  };

  const navigateToEditProduct = (id) => {
    router.push(`${routes.product}/${id}`); 
  };

  return (
    <HeaderWrapper>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">
            Product Management
          </h1>
          <button
            onClick={navigateToAddProduct}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 "
            style={{ zIndex: 10 }}
          >
            + Add Product
          </button>
        </div>
        <ProductFilter
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
        <ProductList
          products={products}
          handleEditProduct={(index) =>
            navigateToEditProduct(products[index].index)
          }
          handleDeleteProduct={handleDeleteProduct}
          filter={filter}
          handleFilterChange={handleFilterChange}
          handlePaginationChange={handlePaginationChange}
          filteredProducts={filteredProducts}
          setFilter={setFilter}
        />
      </div>
    </HeaderWrapper>
  );
};

export default WithAuth(ProductPage) ;

import { useRouter } from "next/router";
import { useEffect } from "react";

const ProductFilter = ({ filter, handleFilterChange }) => {
  const router = useRouter();

  useEffect(() => {
    // Sync filter state with URL query parameters
    const query = {
      search: filter.search || undefined,
      minPrice: filter.minPrice || undefined,
      maxPrice: filter.maxPrice || undefined,
      sort: filter.sort || undefined,
      pageSize: filter.pageSize || undefined,
      currentPage: filter.currentPage || undefined,
    };

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true } // Avoid page reload
    );
  }, [filter]); // Update URL whenever `filter` changes

  return (
    <div className="mb-4">
      {/* Input Fields */}
      <input
        type="text"
        name="search"
        value={filter.search}
        onChange={handleFilterChange}
        placeholder="Search by name or category"
        className="mr-2 p-2 border rounded"
      />
      <input
        type="number"
        name="minPrice"
        value={filter.minPrice}
        onChange={handleFilterChange}
        placeholder="Min Price"
        className="mr-2 p-2 border rounded"
      />
      <input
        type="number"
        name="maxPrice"
        value={filter.maxPrice}
        onChange={handleFilterChange}
        placeholder="Max Price"
        className="mr-2 p-2 border rounded"
      />
      <select
        name="sort"
        value={filter.sort}
        onChange={handleFilterChange}
        className="mr-2 p-2 border rounded"
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
      <select
        name="pageSize"
        value={filter.pageSize}
        onChange={handleFilterChange}
        className="mr-2 p-2 border rounded"
      >
        <option value={5}>5 Records</option>
        <option value={10}>10 Records</option>
        <option value={15}>15 Records</option>
      </select>
    </div>
  );
};

export default ProductFilter;

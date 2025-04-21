import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, message } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import SearchBar from "../components/SearchBar";
import StockStatusTabs from "../components/StockStatusTabs";
import { productTableColumns } from "../components/productTableColumns";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  availabilityStatus: string;
  thumbnail: string;
}

const Products = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockStatus, setStockStatus] = useState("All");
  const navigate = useNavigate();

  // Calculate skip based on page and pageSize
  const skip = (page - 1) * pageSize;

  // Fetch paginated products for the table
  const { data, isLoading } = useQuery({
    queryKey: ["products", { limit: pageSize, skip, searchQuery, stockStatus }],
    queryFn: () => fetchProducts({ limit: pageSize, skip, searchQuery, stockStatus }),
  });

  // Fetch all products for accurate counts
  const { data: allProductsData } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts({ limit: 0, searchQuery }),
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const allProducts = allProductsData?.products || [];

  // Calculate counts for stock status tabs
  const counts = allProducts.reduce(
    (acc: { [key: string]: number }, product: Product) => {
      acc.All += 1;
      const statusKey = product.availabilityStatus.replace(" ", "");
      if (statusKey in acc) {
        acc[statusKey] += 1;
      }
      return acc;
    },
    { All: 0, InStock: 0, LowStock: 0, OutOfStock: 0 }
  );

  // Handle view (navigate to details page)
  const handleView = (id: string) => {
    navigate(`/product/${id}`);
  };

  // Handle edit (placeholder for now)
  const handleEdit = (product: Product) => {
    message.info(`Edit functionality for ${product.title} will be implemented later.`);
  };

  // Handle delete (placeholder for now)
  const handleDelete = (id: number) => {
    message.info(`Delete functionality for product ID ${id} will be implemented later.`);
  };

  // Handle new product (placeholder for now)
  const handleNewProduct = () => {
    message.info("Create product functionality will be implemented later.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="sm:ml-4">
        <Button
          onClick={() => navigate(-1)}
          className="text-gray-600 border-gray-300"
        >
          Back
        </Button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Products</h1>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <StockStatusTabs
            activeTab={stockStatus}
            counts={counts}
            onChange={setStockStatus}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name or description..."
            />
            <Button
              type="primary"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleNewProduct}
            >
              + New Product
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <Table
          columns={productTableColumns({ handleView, handleEdit, handleDelete })}
          dataSource={products}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
          loading={isLoading}
          scroll={{ x: "max-content" }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default Products;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, message, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, deleteProduct } from "../api/products";
import SearchBar from "../components/SearchBar";
import StockStatusTabs from "../components/Product/StockStatusTabs";
import { productTableColumns } from "../components/Product/productTableColumns";
import { DeleteProductResponse, FetchProductsResponse } from "../types/product";
import BackButton from "../components/BackButton";

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
  const queryClient = useQueryClient();
  const skip = (page - 1) * pageSize;

  // Paginated products for the table
  const { data, isLoading } = useQuery({
    queryKey: ["products", { limit: pageSize, skip, searchQuery, stockStatus }],
    queryFn: () =>
      fetchProducts({ limit: pageSize, skip, searchQuery, stockStatus }),
  });

  // All products for accurate counts
  const { data: allProductsData } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts({ limit: 0, searchQuery }),
  });

  // Delete mutation
  const deleteMutation = useMutation<DeleteProductResponse, Error, number>({
    mutationFn: deleteProduct,
    onMutate: async (id: number) => {
      const paginatedQueryKey = [
        "products",
        { limit: pageSize, skip, searchQuery, stockStatus },
      ];
      const allProductsQueryKey = ["products", "all"];

      // Update paginated products
      queryClient.setQueryData<FetchProductsResponse>(
        paginatedQueryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            products: old.products.filter((product) => product.id !== id),
            total: old.total - 1,
          };
        }
      );

      // Update all products
      queryClient.setQueryData<FetchProductsResponse>(
        allProductsQueryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            products: old.products.filter((product) => product.id !== id),
            total: old.total - 1,
          };
        }
      );
    },
    onSuccess: () => {
      message.success("Product deleted successfully!");
    },
    onError: (error: Error) => {
      message.error("Failed to delete product. Please try again.");
      console.error("Delete error:", error);
    },
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

  const handleView = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleEdit = (product: Product) => {
    navigate(`/product/edit/${product.id}`);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteMutation.mutate(id);
      },
    });
  };

  const handleNewProduct = () => {
    navigate("/product/add");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Products</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <StockStatusTabs
            activeTab={stockStatus}
            counts={counts}
            onChange={setStockStatus}
          />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or description..."
          />
          <Button
            type="primary"
            className="!bg-green-600 hover:!bg-green-700"
            onClick={handleNewProduct}
          >
            + New Product
          </Button>
        </div>

        <Table
          columns={productTableColumns({
            handleView,
            handleEdit,
            handleDelete,
          })}
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

import {
  DeleteProductResponse,
  FetchProductsParams,
  FetchProductsResponse,
  Product,
} from "../types/product";

export const fetchProducts = async ({
  limit = 10,
  skip = 0,
  searchQuery = "",
  stockStatus = "",
}: FetchProductsParams): Promise<FetchProductsResponse> => {
  let url = "https://dummyjson.com/products";
  const params = new URLSearchParams();

  if (limit === 0 || limit) params.set("limit", String(limit));
  if (skip) params.set("skip", String(skip));

  if (searchQuery) {
    url = `https://dummyjson.com/products/search`;
    params.set("q", searchQuery);
  }

  const response = await fetch(`${url}?${params.toString()}`);
  const data = await response.json();

  // Filter by stock status if provided
  if (stockStatus && stockStatus !== "All") {
    data.products = data.products.filter(
      (product: Product) => product.availabilityStatus === stockStatus
    );
  }

  return data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  return response.json();
};

export const deleteProduct = async (id: number): Promise<DeleteProductResponse> => {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
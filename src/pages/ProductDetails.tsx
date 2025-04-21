import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/products";
import { Button, Card, Rate, Carousel, Tag, message } from "antd";
import { Product } from "../types/product";
import { CheckCircleOutlined } from "@ant-design/icons";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch product by ID
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  const handleShare = () => {
    message.info("Share functionality will be implemented later.");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  // Calculate stock percentage and status
  const maxStock = 100;
  const percentage = Math.min((product.stock / maxStock) * 100, 100);
  const barColor =
    product.availabilityStatus === "In Stock"
      ? "bg-green-600"
      : product.availabilityStatus === "Low Stock"
      ? "bg-yellow-600"
      : "bg-pink-600";
  const backgroundColor =
    product.availabilityStatus === "In Stock"
      ? "bg-green-200"
      : product.availabilityStatus === "Low Stock"
      ? "bg-yellow-200"
      : "bg-pink-200";
  const textColor =
    product.availabilityStatus === "In Stock"
      ? "text-green-600"
      : product.availabilityStatus === "Low Stock"
      ? "text-yellow-600"
      : "text-pink-600";
  const label =
    product.availabilityStatus === "In Stock"
      ? `${product.stock} in stock`
      : product.availabilityStatus === "Low Stock"
      ? `${product.stock} low stock`
      : `${product.stock} out of stock`;

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="sm:ml-4">
        <Button
          onClick={() => navigate("/product")}
          className="text-gray-600 border-gray-300"
        >
          Back
        </Button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <Carousel dots dotPosition="bottom" className="mb-4">
              {product.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4 !font-poppins">
              <p
                className={`text-sm font-semibold ${
                  product.availabilityStatus === "Out of Stock"
                    ? "text-pink-600"
                    : product.availabilityStatus === "Low Stock"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {product.availabilityStatus.toUpperCase()}
              </p>
              <h1 className="text-3xl !font-semibold text-gray-800 mt-2">
                {product.title}
              </h1>
              <div className="flex items-center mt-2">
                <Rate
                  disabled
                  value={product.rating}
                  allowHalf
                  className="mr-2"
                />
                <span className="text-gray-600">
                  ({product.rating.toFixed(1)}) - {product.reviews.length}{" "}
                  reviews
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md mt-4">
                <p className="text-2xl font-bold text-gray-900 mt-2 !mb-0">
                  ${product.price.toFixed(2)}
                  {product.discountPercentage > 0 && (
                    <span className="text-sm text-green-600 ml-2">
                      ({product.discountPercentage}% off)
                    </span>
                  )}
                </p>
                <Button
                  onClick={handleShare}
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Share
                </Button>
              </div>

              {/* Description Section */}
              <Card className="!mt-12 !font-poppins shadow-md sm:shadow-none">
                <div className="flex flex-col gap-6 p-2">
                  <div className="border-b-green-200 border-b-2 pb-4">
                    <h2 className="text-xl !font-semibold mb-2 text-gray-800">
                      Description
                    </h2>
                    <p className="text-gray-600 !mb-0">{product.description}</p>
                  </div>

                  <div className="flex flex-col gap-2 border-b-green-200 border-b-2 pb-4">
                    <h2 className="text-xl !font-semibold mb-2 text-gray-800">
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-2 ">
                      {product.tags.map((tag, index) => (
                        <Tag key={index} color="blue">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl !font-semibold mb-2 text-gray-800">
                      Metadata
                    </h2>
                    <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                      <p className="sm:col-span-1 !mb-0">
                        <strong className="!font-semibold">Created At:</strong>{" "}
                        {new Date(product.meta.createdAt).toLocaleString()}
                      </p>
                      <p className="sm:col-span-1 !mb-0">
                        <strong className="!font-semibold">Updated At:</strong>{" "}
                        {new Date(product.meta.updatedAt).toLocaleString()}
                      </p>
                      <p className="sm:col-span-1 !mb-0">
                        <strong className="!font-semibold">Barcode:</strong>{" "}
                        {product.meta.barcode}
                      </p>
                      <p className="sm:col-span-1 !mb-0">
                        <strong className="!font-semibold">QR Code:</strong>{" "}
                        <Link
                          to={product.meta.qrCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View QR Code
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Other Details */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="mb-4 shadow-md !p-4">
            <h2 className="text-xl !font-semibold mb-2 text-gray-800">
              Basic Information
            </h2>
            <div className="space-y-2">
              <p className="!mb-0">
                <strong className="!font-semibold text-gray-400">
                  Category:
                </strong>{" "}
                {product.category}
              </p>
              <p className="!mb-0">
                <strong className="!font-semibold text-gray-400">Brand:</strong>{" "}
                {product.brand}
              </p>
              <p className="!mb-0">
                <strong className="!font-semibold text-gray-400">SKU:</strong>{" "}
                {product.sku}
              </p>
              <div>
                <strong className="!font-semibold text-gray-400">Stock:</strong>
                <div className=" max-w-[180px] flex flex-col mt-1">
                  <div className={`h-2 rounded-full ${backgroundColor}`}>
                    <div
                      className={`h-full rounded-full ${barColor}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className={`text-xs mt-1 ${textColor}`}>{label}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-4 shadow-md lg:w-full">
            <h2 className="text-xl !font-semibold mb-2 text-gray-800">
              Specifications
            </h2>
            <div className="space-y-2">
              <p className="!mb-0">
                <strong className="!font-semibold text-gray-400">
                  Weight:
                </strong>{" "}
                {product.weight} kg
              </p>
              <p className="!mb-0">
                <strong className="!font-semibold text-gray-400">
                  Dimensions:
                </strong>{" "}
                {product.dimensions.width} x {product.dimensions.height} x{" "}
                {product.dimensions.depth} cm
              </p>
              <p className="!mb-0">
                <strong className="!font-semibold text-gray-400">
                  Warranty:
                </strong>{" "}
                {product.warrantyInformation}
              </p>
              <p className="!mb-0">
                <strong className="!font-semibold text-gray-400">
                  Shipping:
                </strong>{" "}
                {product.shippingInformation}
              </p>
              <p className="!mb-0">
                <strong className="!font-semibold text-gray-400">
                  Return Policy:
                </strong>{" "}
                {product.returnPolicy}
              </p>
              <p className="!mb-0">
                <strong className="!font-semibold text-gray-400">
                  Minimum Order Quantity:
                </strong>{" "}
                {product.minimumOrderQuantity}
              </p>
            </div>
          </Card>
        </div>

        {/* Reviews Section */}
        <Card className="!mt-8 shadow-md !p-0">
          <h2 className="text-2xl !font-semibold !mb-8 text-gray-800">
            Reviews
          </h2>
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div
                key={index}
                className="mb-6 border-b border-b-green-200 pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  {/* Reviewer Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 !font-semibold text-lg">
                      {review.reviewerName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <p className="!font-semibold text-gray-800 !mb-0">
                          {review.reviewerName}
                        </p>
                        <p className="text-sm text-gray-500 !mt-0">
                          {new Date(review.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <Rate
                        disabled
                        value={review.rating}
                        allowHalf
                        className="!text-sm sm:!text-xl !text-green-600"
                      />
                    </div>
                    <p className="!mt-4 text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews available.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;

import { Button, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  availabilityStatus: string;
  thumbnail: string;
}

interface ProductTableColumnsProps {
  handleView: (id: string) => void;
  handleEdit: (product: Product) => void;
  handleDelete: (id: number) => void;
}

export const productTableColumns = ({
  handleView,
  handleEdit,
  handleDelete,
}: ProductTableColumnsProps) => {
  return [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (thumbnail: string) => (
        <img
          src={thumbnail}
          alt="Product Thumbnail"
          className="w-10 h-10 rounded"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a: Product, b: Product) => a.title.localeCompare(b.title),
      render: (title: string, record: Product) => (
        <Link
          to={`/product/${record.id}`}
          className="text-blue-600 hover:underline font-inter"
        >
          {title}
        </Link>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a: Product, b: Product) => a.category.localeCompare(b.category),
      render: (category: string) => (
        <span className="text-gray-600 font-inter">{category}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: number) => (
        <span className="text-gray-800 font-poppins font-medium">${price.toFixed(2)}</span>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: (a: Product, b: Product) => a.stock - b.stock,
      render: (stock: number, record: Product) => {
        const maxStock = 100;
        const percentage = Math.min((stock / maxStock) * 100, 100); // Cap at 100%

        const barColor =
          record.availabilityStatus === "In Stock"
            ? "bg-green-400"
            : record.availabilityStatus === "Low Stock"
            ? "bg-yellow-400"
            : "bg-pink-400";

        const backgroundColor =
          record.availabilityStatus === "In Stock"
            ? "bg-green-100"
            : record.availabilityStatus === "Low Stock"
            ? "bg-yellow-100"
            : "bg-pink-100";

        const label =
          record.availabilityStatus === "In Stock"
            ? `${stock} in stock`
            : record.availabilityStatus === "Low Stock"
            ? `${stock} low stock`
            : `${stock} out of stock`;

        return (
          <div className="flex flex-col w-32">
            <div className={`w-full h-2 rounded-full ${backgroundColor}`}>
              <div
                className={`h-full rounded-full ${barColor}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className={`text-sm font-semibold mt-1 text-center text-gray-500 font-poppins`}>{label}</span>
          </div>
        );
      },
    },
    {
      title: "Publish",
      dataIndex: "publish",
      render: () => (
        <span className="text-gray-800 font-inter">Published</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: Product) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: "View",
                onClick: () => handleView(String(record.id)),
              },
              {
                key: "edit",
                label: "Edit",
                onClick: () => handleEdit(record),
              },
              {
                key: "delete",
                label: "Delete",
                onClick: () => handleDelete(record.id),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
};

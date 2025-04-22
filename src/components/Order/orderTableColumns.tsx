import { Link } from "react-router-dom";
import { Button, Tag, Space, Popconfirm } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { Order, Customer } from "../../types/order";

interface OrderTableColumnsProps {
  handleDelete: (orderId: number) => void;
  onView: (id: number) => void;
}

export const orderTableColumns = ({
  handleDelete,
  onView,
}: OrderTableColumnsProps) => [
  {
    title: <span className="!font-poppins">Order</span>,
    dataIndex: "id",
    sorter: (a: Order, b: Order) => a.id - b.id,
    render: (id: number) => (
      <Link
        to={`/order/${id}`}
        className="!text-blue-600 hover:underline !font-poppins"
      >
        <span className="!font-semibold">#{id}</span>
      </Link>
    ),
  },
  {
    title: <span className="!font-poppins">Customer</span>,
    dataIndex: "customer",
    render: (customer: Customer) => (
      <div className="flex items-center">
        <img
          src={customer.avatar}
          alt={customer.name}
          className="w-8 h-8 rounded-full !mr-6"
        />
        <div className="flex flex-col !m-0">
          <p className="!text-gray-800 !font-medium !font-poppins !mb-0">
            {customer.name}
          </p>
          <p className="!text-gray-500 !text-sm !font-poppins !mb-0">
            {customer.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    title: <span className="!font-poppins">Date</span>,
    dataIndex: "date",
    sorter: (a: Order, b: Order) =>
      new Date(a.date).getTime() - new Date(b.date).getTime(),
    render: (date: string) => (
      <div>
        <p className="!text-gray-800 !font-poppins !mb-0">
          {moment(date).format("DD MMM YYYY")}
        </p>
        <p className="!text-gray-500 !text-sm !font-poppins !mb-0">
          {moment(date).format("h:mm a")}
        </p>
      </div>
    ),
  },
  {
    title: <span className="!font-poppins">Items</span>,
    dataIndex: "items",
    sorter: (a: Order, b: Order) => a.items - b.items,
    render: (items: number) => <span className="!font-inter">{items}</span>,
  },
  {
    title: <span className="!font-poppins">Price</span>,
    dataIndex: "price",
    sorter: (a: Order, b: Order) => a.price - b.price,
    render: (price: number) => (
      <span className="!font-inter">${price.toFixed(2)}</span>
    ),
  },
  {
    title: <span className="!font-poppins">Status</span>,
    dataIndex: "status",
    render: (status: string) => {
      const colorMap: { [key: string]: string } = {
        Pending: "gold",
        Completed: "green",
        Cancelled: "red",
        Refunded: "gray",
      };
      return (
        <Tag color={colorMap[status]} className="!font-poppins">
          {status}
        </Tag>
      );
    },
  },
  {
    title: <span className="!font-poppins">Action</span>,
    dataIndex: "actions",
    render: (_: any, record: Order) => (
      <Space>
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => onView(record.id)}
          className="!text-blue-600 !font-poppins"
        />
        <Popconfirm
          title="Are you sure to delete this order?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" icon={<DeleteOutlined />} danger />
        </Popconfirm>
      </Space>
    ),
  },
];

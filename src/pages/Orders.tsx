import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Tabs, Button, Tag, Space, Popconfirm, message } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import ordersData from "../data/ordersData.json";
import Loader from "../components/Loader";
import moment from "moment";
import SearchBar from "../components/SearchBar";

const { TabPane } = Tabs;

interface Customer {
  name: string;
  email: string;
  avatar: string;
}

interface Order {
  id: number;
  customer: Customer;
  date: string;
  items: number;
  price: number;
  status: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // Load orders data
  useEffect(() => {
    setLoading(true);
    const loadOrders = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data: Order[] = ordersData;
      setOrders(data);
      setFilteredOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  // Filter orders based on tab and search text
  useEffect(() => {
    let filtered = orders;

    // Filter by status (tab)
    if (activeTab !== "All") {
      filtered = filtered.filter((order) => order.status === activeTab);
    }

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(
        (order) =>
          order.customer.name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          order.id.toString().includes(searchText)
      );
    }

    setFilteredOrders(filtered);
  }, [activeTab, searchText, orders]);

  // Calculate counts for tabs
  const counts = orders.reduce(
    (acc, order) => {
      acc.All += 1;
      if (order.status in acc) {
        acc[order.status as keyof typeof acc] += 1;
      }
      return acc;
    },
    { All: 0, Pending: 0, Completed: 0, Cancelled: 0, Refunded: 0 }
  );

  // Handle delete order
  const handleDelete = (orderId: number) => {
    setOrders(orders.filter((order) => order.id !== orderId));
    message.success("Order deleted successfully");
  };

  // Table columns
  const columns = [
    {
      title: "Order",
      dataIndex: "id",
      sorter: (a: Order, b: Order) => a.id - b.id,
      render: (id: number) => (
        <Link to={`/order/${id}`} className="text-blue-600 hover:underline">
          #{id}
        </Link>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      render: (customer: Customer) => (
        <div className="flex items-center">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="w-8 h-8 rounded-full mr-6"
          />
          <div className="flex flex-col m-0 *">
            <p className="text-gray-800 font-medium">{customer.name}</p>
            <p className="text-gray-500 text-sm m-0 leading-none">
              {customer.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a: Order, b: Order) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date: string) => (
        <div>
          <p className="text-gray-800">{moment(date).format("DD MMM YYYY")}</p>
          <p className="text-gray-500 text-sm">
            {moment(date).format("h:mm a")}
          </p>
        </div>
      ),
    },
    {
      title: "Items",
      dataIndex: "items",
      sorter: (a: Order, b: Order) => a.items - b.items,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: Order, b: Order) => a.price - b.price,
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        const colorMap: { [key: string]: string } = {
          Pending: "gold",
          Completed: "green",
          Cancelled: "red",
          Refunded: "gray",
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_: any, record: Order) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/order/${record.id}`)}
            className="text-blue-600"
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
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Orders</h1>

        {/* Filters */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="mb-6"
          tabBarStyle={{
            marginBottom: "5px",
            fontWeight: 500,
            fontSize: "16px",
          }}
        >
          {["All", "Pending", "Completed", "Cancelled", "Refunded"].map(
            (status) => (
              <TabPane
                tab={
                  <span
                    className={`px-4 py-1 rounded-full transition-all ${
                      status === "Pending"
                        ? "hover:bg-yellow-50 text-yellow-600"
                        : status === "Completed"
                        ? "hover:bg-green-50 text-green-600"
                        : status === "Cancelled"
                        ? "hover:bg-red-50 text-red-500"
                        : status === "Refunded"
                        ? "hover:bg-gray-100 text-gray-600"
                        : "hover:bg-gray-100"
                    } text-shadow-md`}
                  >
                    {status}{" "}
                    <span className="text-gray-500">
                      ({counts[status as keyof typeof counts]})
                    </span>
                  </span>
                }
                key={status}
              />
            )
          )}
        </Tabs>

        {/* Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-6">
          <SearchBar
            value={searchText}
            onChange={setSearchText}
            placeholder="Search customer or order number..."
          />
        </div>

        {/* Orders Table */}
        {loading ? (
          <Loader
            tip="Fetching orders..."
            fullScreen={window.innerWidth < 640}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredOrders}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;

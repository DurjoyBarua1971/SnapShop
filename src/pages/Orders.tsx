import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Tabs, Input, Button, Tag, Space, Popconfirm, message } from "antd";
import { SearchOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import ordersData from "../data/ordersData.json";
import Loader from "../components/Loader";
import moment from "moment";

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
          order.customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
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
        <a onClick={() => navigate(`/order/${id}`)} className="text-blue-600 hover:underline">
          #{id}
        </a>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      render: (customer: Customer) => (
        <div className="flex items-center">
          <img src={customer.avatar} alt={customer.name} className="w-8 h-8 rounded-full mr-6" />
          <div className="flex flex-col gap-3">
            <p className="text-gray-800 font-medium">{customer.name}</p>
            <p className="text-gray-500 text-sm m-0 leading-none">{customer.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a: Order, b: Order) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date: string) => (
        <div>
          <p className="text-gray-800">{moment(date).format("DD MMM YYYY")}</p>
          <p className="text-gray-500 text-sm">{moment(date).format("h:mm a")}</p>
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
          <Popconfirm
            title="Are you sure to delete this order?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<DeleteOutlined />} danger />
          </Popconfirm>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/order/${record.id}`)}
            className="text-blue-600"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Orders</h1>

        {/* Filters */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          tabBarGutter={1}
          className="mb-6"
          tabBarStyle={{
            marginBottom: "5px",
            fontWeight: 500,
            fontSize: "16px",
          }}
          moreIcon={null}
        >
          <TabPane
            tab={
              <span className="px-4 py-1 rounded-full hover:bg-gray-100 transition-all">
                All <span className="text-gray-500">({counts.All})</span>
              </span>
            }
            key="All"
          />
          <TabPane
            tab={
              <span className="px-4 py-1 rounded-full hover:bg-yellow-50 transition-all text-yellow-600">
                Pending <span className="text-gray-500">({counts.Pending})</span>
              </span>
            }
            key="Pending"
          />
          <TabPane
            tab={
              <span className="px-4 py-1 rounded-full hover:bg-green-50 transition-all text-green-600">
                Completed <span className="text-gray-500">({counts.Completed})</span>
              </span>
            }
            key="Completed"
          />
          <TabPane
            tab={
              <span className="px-4 py-1 rounded-full hover:bg-red-50 transition-all text-red-500">
                Cancelled <span className="text-gray-500">({counts.Cancelled})</span>
              </span>
            }
            key="Cancelled"
          />
          <TabPane
            tab={
              <span className="px-4 py-1 rounded-full hover:bg-gray-100 transition-all text-gray-600">
                Refunded <span className="text-gray-500">({counts.Refunded})</span>
              </span>
            }
            key="Refunded"
          />
        </Tabs>


        {/* Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input
            placeholder="Search customer or order number..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:w-64 custom-input"
          />
        </div>

        {/* Orders Table */}
        {loading ? (
          <Loader tip="Fetching orders..." fullScreen={window.innerWidth < 640} />
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
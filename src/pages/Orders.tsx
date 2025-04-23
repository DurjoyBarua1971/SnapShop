import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import ordersData from "../data/ordersData.json";
import SearchBar from "../components/SearchBar";
import BackButton from "../components/BackButton";
import { Order } from "../types/order";
import OrderStatusTabs from "../components/Order/OrderStatusTabs";
import OrdersTable from "../components/Order/OrderTable";

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

  const handleDelete = (orderId: number) => {
    setOrders(orders.filter((order) => order.id !== orderId));
    message.success("Order deleted successfully");
  };

  const handleView = (id: number) => {
    navigate(`/order/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 !font-poppins">
      <div className="container mx-auto sm:px-2 lg:px-16 py-6 space-y-8">
        <BackButton />
        <h1 className="!text-3xl !font-semibold !text-gray-800 !font-poppins">
          Orders
        </h1>

        <OrderStatusTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          counts={counts}
        />

        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="Search customer or order number..."
        />

        <OrdersTable
          orders={filteredOrders}
          loading={loading}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>
    </div>
  );
};

export default Orders;

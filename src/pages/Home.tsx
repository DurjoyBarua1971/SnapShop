import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Card } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  RollbackOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import MetricCard from "../components/Dashboard/MetricCard";
import Loader from "../components/Loader";
import metricsData from "../data/metricsData.json";

const { Option } = Select;

interface Metric {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

interface MetricsData {
  [key: string]: {
    [key: string]: number;
  };
}

const Home = () => {
  const [filter, setFilter] = useState("Overall");
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const timeFilters = ["Overall", "Last Week", "Last Month"];

  // Icon mapping for metrics
  const iconMap: { [key: string]: React.ReactNode } = {
    "Product Sold": <ShoppingCartOutlined />,
    "Sales Profit": <DollarOutlined />,
    "Total Users": <TeamOutlined />,
    "Orders Pending": <ClockCircleOutlined />,
    "Orders Refunded": <RollbackOutlined />,
    "Orders Cancelled": <CloseCircleOutlined />,
    "Orders Completed": <CheckCircleOutlined />,
  };

  // Process metrics based on selected filter
  useEffect(() => {
    setLoading(true);
    const data: MetricsData = metricsData;
    const selectedMetrics = data[filter] || data["Overall"];

    const formattedMetrics: Metric[] = Object.entries(selectedMetrics).map(
      ([label, value]) => ({
        label,
        value: label.includes("Profit") ? `$${value.toLocaleString()}` : value,
        icon: iconMap[label] || null,
      })
    );

    // Simulate a delay to show the loader (remove in production if data loads instantly)
    setTimeout(() => {
      setMetrics(formattedMetrics);
      setLoading(false);
    }, 1000);
  }, [filter]);

  const navigationItems = [
    { label: "Users", path: "/user", icon: <UserOutlined /> },
    { label: "Products", path: "/product", icon: <ShoppingOutlined /> },
    { label: "Orders", path: "/order", icon: <FileTextOutlined /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Header Section with Title and Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <Select
            value={filter}
            onChange={setFilter}
            className="w-full mx-w-[200px] md:w-48 custom-select"
            size="large"
            dropdownStyle={{
              borderRadius: "8px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {timeFilters.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>

        {/* Metrics Section */}
        {loading ? (
          <Loader tip="Fetching metrics..." />
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {metrics.map((metric) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                icon={metric.icon}
              />
            ))}
          </motion.div>
        )}

        {/* Navigation Section */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationItems.map((nav) => (
              <Card
                key={nav.label}
                hoverable
                className="bg-white p-[16px] border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl border-t-4 hover:border-green-500"
                onClick={() => navigate(nav.path)}
              >
                <div className="flex space-x-2 justify-center">
                  {nav.icon && (
                    <div className="text-green-600 text-2xl">{nav.icon}</div>
                  )}
                  <p className="text-2xl text-gray-600 font-bold font-poppins">
                    {nav.label}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Manage {nav.label.toLowerCase()} details
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

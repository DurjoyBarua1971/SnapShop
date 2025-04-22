import { Tabs } from "antd";

interface OrderStatusTabsProps {
  activeTab: string;
  onChange: (key: string) => void;
  counts: {
    All: number;
    Pending: number;
    Completed: number;
    Cancelled: number;
    Refunded: number;
  };
}

const OrderStatusTabs: React.FC<OrderStatusTabsProps> = ({
  activeTab,
  onChange,
  counts,
}) => {
  return (
    <Tabs
      activeKey={activeTab}
      onChange={onChange}
      className="!mb-6"
      tabBarStyle={{
        marginBottom: "5px",
        fontWeight: 500,
        fontSize: "16px",
      }}
      items={["All", "Pending", "Completed", "Cancelled", "Refunded"].map(
        (status) => ({
          label: (
            <span
              className={`px-4 py-1 rounded-full transition-all ${
                status === "Pending"
                  ? "hover:bg-yellow-50 !text-yellow-600"
                  : status === "Completed"
                  ? "hover:bg-green-50 !text-green-600"
                  : status === "Cancelled"
                  ? "hover:bg-red-50 !text-red-500"
                  : status === "Refunded"
                  ? "hover:bg-gray-100 !text-gray-600"
                  : "hover:bg-gray-100"
              } !font-poppins`}
            >
              {status}{" "}
              <span className="!text-gray-500 !font-poppins">
                ({counts[status as keyof typeof counts]})
              </span>
            </span>
          ),
          key: status,
        })
      )}
    />
  );
};

export default OrderStatusTabs;

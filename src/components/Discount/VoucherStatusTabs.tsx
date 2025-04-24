import { Tabs } from "antd";

interface VoucherStatusTabsProps {
  activeTab: string;
  onChange: (key: string) => void;
  counts: { All: number; Active: number; Expired: number };
}

const VoucherStatusTabs: React.FC<VoucherStatusTabsProps> = ({ activeTab, onChange, counts }) => {
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
      items={["All", "Active", "Expired"].map((status) => ({
        label: (
          <span
            className={`px-4 py-1 rounded-full transition-all ${
              status === "Active"
                ? "hover:bg-green-50 !text-green-600"
                : status === "Expired"
                ? "hover:bg-red-50 !text-red-500"
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
      }))}
    />
  );
};

export default VoucherStatusTabs;
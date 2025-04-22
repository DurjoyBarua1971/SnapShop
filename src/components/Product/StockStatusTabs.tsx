import { Tabs } from "antd";

interface StockStatusTabsProps {
  activeTab: string;
  counts: { [key: string]: number };
  onChange: (key: string) => void;
}

const StockStatusTabs = ({
  activeTab,
  counts,
  onChange,
}: StockStatusTabsProps) => (
  <Tabs
    activeKey={activeTab}
    onChange={onChange}
    tabBarGutter={1}
    className="mb-6"
    tabBarStyle={{
      marginBottom: "5px",
      fontWeight: 500,
      fontSize: "16px",
    }}
    moreIcon={null}
    items={[
      {
        label: (
          <span className="px-4 py-1 rounded-full hover:bg-gray-100 transition-all !font-poppins">
            All{" "}
            <span className="text-gray-500 !font-inter">({counts.All})</span>
          </span>
        ),
        key: "All",
      },
      {
        label: (
          <span className="px-4 py-1 rounded-full hover:bg-green-50 transition-all text-green-600 !font-poppins">
            In Stock{" "}
            <span className="text-gray-500 !font-inter">
              ({counts.InStock})
            </span>
          </span>
        ),
        key: "In Stock",
      },
      {
        label: (
          <span className="px-4 py-1 rounded-full hover:bg-yellow-50 transition-all text-yellow-600 !font-poppins">
            Low Stock{" "}
            <span className="text-gray-500 !font-inter">
              ({counts.LowStock})
            </span>
          </span>
        ),
        key: "Low Stock",
      },
      {
        label: (
          <span className="px-4 py-1 rounded-full hover:bg-red-50 transition-all text-red-500 !font-poppins">
            Out of Stock{" "}
            <span className="text-gray-500 !font-inter">
              ({counts.OutOfStock})
            </span>
          </span>
        ),
        key: "Out of Stock",
      },
    ]}
  />
);

export default StockStatusTabs;

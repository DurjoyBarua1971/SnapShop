import { Tabs } from "antd";
import React from "react";

interface StatusTabsProps {
  activeTab: string;
  onChange: (key: string) => void;
  counts: { All: number; Active: number; Pending: number; Blocked: number };
}

const UserStatusTabs: React.FC<StatusTabsProps> = ({
  activeTab,
  onChange,
  counts,
}) => {
  return (
    <Tabs
      activeKey={activeTab}
      onChange={onChange}
      tabBarGutter={1}
      className="mb-6 font-semibold"
      moreIcon={null}
      items={["All", "Active", "Pending", "Blocked"].map((status) => ({
        label: (
          <span
            className={`px-4 py-1 rounded-full hover:bg-${
              status === "Active"
                ? "green-50 text-green-600"
                : status === "Pending"
                ? "yellow-50 text-yellow-600"
                : status === "Blocked"
                ? "red-50 text-red-500"
                : "gray-100"
            } transition-all text-shadow-xs !font-poppins`}
          >
            {status}{" "}
            <span className="text-gray-500 !font-inter">
              ({counts[status as keyof typeof counts]})
            </span>
          </span>
        ),
        key: status,
      }))}
    />
  );
};

export default UserStatusTabs;

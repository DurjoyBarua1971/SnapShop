import { Card } from "antd";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="bg-white p-[16px] border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl border-t-4 hover:border-green-500"
      >
        <div className="flex space-x-2 justify-center">
          {icon && (
            <div className="text-green-600 text-[18px]">
              {icon}
            </div>
          )}
          <p className="text-[18px] text-gray-600 font-bold font-inter">{label}</p>
        </div>
        <p className="text-3xl font-medium text-gray-800 mt-4 text-center font-poppins">{value}</p>
      </Card>
    </motion.div>
  );
};

export default MetricCard;
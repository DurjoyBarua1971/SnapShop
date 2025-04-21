import { Button, Modal } from "antd";
import { User } from "../types/user";

interface UserViewModalProps {
  visible: boolean;
  user: User | null;
  onCancel: () => void;
}

const UserViewModal = ({ visible, user, onCancel }: UserViewModalProps) => {
  if (!user) return null;

  return (
    <Modal
      title="User Details"
      open={visible}
      footer={[
        <Button key="close" onClick={onCancel} className="!font-semibold">
          Close
        </Button>,
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            Full Name
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.name}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            Email
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.email}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            Phone Number
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.phoneNumber}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            Country
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.country}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            State/Region
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.state}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            City
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.city}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            Address
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.address}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            Zip/Code
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.zipCode}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            Company
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.company}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            Role
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.role}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            Status
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.status}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            Total Orders
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            {user.totalOrders}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase mb-1">
            Total Spent
          </span>
          <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900">
            ${user.totalSpent.toFixed(2)}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserViewModal;

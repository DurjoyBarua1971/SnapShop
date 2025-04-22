import { Button, Tag, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { User } from "../../types/user";

interface UserTableColumnsProps {
  handleEdit: (user: User) => void;
  handleDelete: (userId: number) => void;
  handleView: (user: User) => void; // Add handleView prop
}

export const userTableColumns = ({
  handleEdit,
  handleDelete,
  handleView,
}: UserTableColumnsProps) => [
  {
    title: <span className="!font-poppins">Name</span>,
    dataIndex: "name",
    sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    render: (name: string, record: User) => (
      <div className="flex items-center !font-poppins">
        <img
          src={record.avatar}
          alt={name}
          className="w-8 h-8 rounded-full mr-6"
        />
        <div className="flex flex-col m-0">
          <button
            onClick={() => handleView(record)}
            className="!text-blue-600 hover:underline text-left font-medium"
          >
            {name}
          </button>
          <p className="text-gray-500 text-sm m-0 leading-none">
            {record.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    title: <span className="!font-poppins">Total Orders</span>,
    dataIndex: "totalOrders",
    sorter: (a: User, b: User) => a.totalOrders - b.totalOrders,
  },
  {
    title: <span className="!font-poppins">Total Spent</span>,
    dataIndex: "totalSpent",
    sorter: (a: User, b: User) => a.totalSpent - b.totalSpent,
    render: (totalSpent: number) => `$${totalSpent.toFixed(2)}`,
  },
  {
    title: <span className="!font-poppins">Role</span>,
    dataIndex: "role",
    render: (role: string) => {
      const colorMap: { [key: string]: string } = {
        Customer: "blue",
        Admin: "purple",
        Support: "cyan",
        "Content Creator": "orange",
      };
      return <Tag color={colorMap[role]}>{role}</Tag>;
    },
  },
  {
    title: <span className="!font-poppins">Status</span>,
    dataIndex: "status",
    render: (status: string) => {
      const colorMap: { [key: string]: string } = {
        Active: "green",
        Pending: "gold",
        Blocked: "red",
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    },
  },
  {
    title: <span className="!font-poppins">Actions</span>,
    dataIndex: "actions",
    render: (_: any, record: User) => (
      <Space>
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          className="text-blue-600"
        />
        {record.status !== "Blocked" && (
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        )}
      </Space>
    ),
  },
];

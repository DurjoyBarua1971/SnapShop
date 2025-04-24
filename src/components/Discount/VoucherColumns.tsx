import { Button, Tag, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Voucher } from "../../types/voucher";

interface VoucherColumnsProps {
  setSelectedVoucher: (voucher: Voucher) => void;
  setIsUpdateModalOpen: (isOpen: boolean) => void;
  onDelete: (voucherId: number) => void;
}

const VoucherColumns = ({
  setSelectedVoucher,
  setIsUpdateModalOpen,
  onDelete,
}: VoucherColumnsProps) => {
  return [
    {
      title: <span className="!font-poppins">Code</span>,
      dataIndex: "code",
      sorter: (a: Voucher, b: Voucher) => a.code.localeCompare(b.code),
      render: (code: string) => <span className="!font-poppins">{code}</span>,
    },
    {
      title: <span className="!font-poppins">Type</span>,
      dataIndex: "type",
      sorter: (a: Voucher, b: Voucher) => a.type.localeCompare(b.type),
      render: (type: string) => <span className="!font-poppins">{type}</span>,
    },
    {
      title: <span className="!font-poppins">Value</span>,
      dataIndex: "value",
      sorter: (a: Voucher, b: Voucher) => a.value - b.value,
      render: (value: number, record: Voucher) => (
        <span className="!font-inter">
          {record.type === "percentage" ? `${value}%` : `$${value.toFixed(2)}`}
        </span>
      ),
    },
    {
      title: <span className="!font-poppins">Expiration Date</span>,
      dataIndex: "expirationDate",
      sorter: (a: Voucher, b: Voucher) =>
        new Date(a.expirationDate).getTime() -
        new Date(b.expirationDate).getTime(),
      render: (date: string) => <span className="!font-poppins">{date}</span>,
    },
    {
      title: <span className="!font-poppins">Max Uses Per User</span>,
      dataIndex: "maxUsesPerUser",
      sorter: (a: Voucher, b: Voucher) => a.maxUsesPerUser - b.maxUsesPerUser,
      render: (maxUsesPerUser: number) => (
        <span className="!font-inter">{maxUsesPerUser}</span>
      ),
    },
    {
      title: <span className="!font-poppins">Status</span>,
      dataIndex: "status",
      render: (status: string) => {
        const colorMap: { [key: string]: string } = {
          Active: "green",
          Expired: "red",
        };
        return (
          <Tag color={colorMap[status]} className="!font-poppins">
            {status}
          </Tag>
        );
      },
    },
    {
      title: <span className="!font-poppins">Action</span>,
      dataIndex: "actions",
      render: (_: any, record: Voucher) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedVoucher(record);
              setIsUpdateModalOpen(true);
            }}
            className="!text-blue-600 !font-poppins"
          />
          <Popconfirm
            title="Are you sure to delete this voucher?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];
};

export default VoucherColumns;

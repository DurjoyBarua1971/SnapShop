import { Table, Tag, Space, Popconfirm, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Loader from "../Loader";
import { Voucher } from "../../types/voucher";
import VoucherModal from "./VoucherModal";
import { useState } from "react";
import VoucherColumns from "./VoucherColumns";

interface VoucherTableProps {
  vouchers: Voucher[];
  loading: boolean;
  onDelete: (voucherId: number) => void;
  onCreate: (voucher: Omit<Voucher, "id" | "status">) => void;
  onUpdate: (voucher: Voucher) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

const VoucherTable: React.FC<VoucherTableProps> = ({
  vouchers,
  loading,
  onDelete,
  onCreate,
  onUpdate,
  isCreateModalOpen,
  setIsCreateModalOpen,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | undefined>(
    undefined
  );

  const columns = VoucherColumns({
    setSelectedVoucher,
    setIsUpdateModalOpen,
    onDelete,
  });

  return (
    <>
      <div className="flex justify-end mb-4"></div>
      {loading ? (
        <Loader
          tip="Fetching vouchers..."
          fullScreen={window.innerWidth < 640}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={vouchers}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      )}
      <VoucherModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={onCreate}
      />
      <VoucherModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={onUpdate}
        initialData={selectedVoucher}
      />
    </>
  );
};

export default VoucherTable;

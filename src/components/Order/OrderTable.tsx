import { Table } from "antd";
import Loader from "../Loader";
import { Order } from "../../types/order";
import { orderTableColumns } from "./orderTableColumns";

interface OrdersTableProps {
  orders: Order[];
  loading: boolean;
  onDelete: (orderId: number) => void;
  onView: (id: number) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  loading,
  onDelete,
  onView,
}) => {
  return loading ? (
    <Loader tip="Fetching orders..." fullScreen={window.innerWidth < 640} />
  ) : (
    <Table
      columns={orderTableColumns({ handleDelete: onDelete, onView })}
      dataSource={orders}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default OrdersTable;

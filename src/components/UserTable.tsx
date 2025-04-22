import { Table } from "antd";
import Loader from "./Loader";
import { User } from "../types/user";
import { userTableColumns } from "./userTableColumns";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  onView: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, loading, onEdit, onDelete, onView }) => {
  return loading ? (
    <Loader tip="Fetching users..." fullScreen={window.innerWidth < 640} />
  ) : (
    <Table
      columns={userTableColumns({ handleEdit: onEdit, handleDelete: onDelete, handleView: onView })}
      dataSource={users}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      scroll={{ x: "max-content" }}
      className="custom-table"
    />
  );
};

export default UsersTable;
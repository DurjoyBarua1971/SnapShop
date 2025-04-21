import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Tabs, Button } from "antd";
import usersData from "../data/usersData.json";
import Loader from "../components/Loader";
import UserEditModal from "../components/UserEditModal";
import { userTableColumns } from "../components/userTableColumns";
import SearchBar from "../components/SearchBar";
import { User } from "../types/user";
import UserViewModal from "../components/UserViewModal";

const { TabPane } = Tabs;

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Load users data
  useEffect(() => {
    setLoading(true);
    const loadUsers = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data: User[] = usersData;
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    };
    loadUsers();
  }, []);

  // Filter users based on tab and search text
  useEffect(() => {
    let filtered = users;

    // Filter by status (tab)
    if (activeTab !== "All") {
      filtered = filtered.filter((user) => user.status === activeTab);
    }

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [activeTab, searchText, users]);

  // Calculate counts for tabs
  const counts = users.reduce(
    (acc, user) => {
      acc.All += 1;
      if (user.status in acc) {
        acc[user.status as keyof typeof acc] += 1;
      }
      return acc;
    },
    { All: 0, Active: 0, Pending: 0, Blocked: 0 }
  );

  // Handle delete user
  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  // Handle edit user
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = (values: Partial<User>) => {
    setUsers(users.map((user) =>
      user.id === editingUser?.id ? { ...user, ...values } : user
    ));
    setIsEditModalVisible(false);
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setEditingUser(null);
  };

  // Handle view user
  const handleView = (user: User) => {
    setViewingUser(user);
    setIsViewModalVisible(true);
  };

  const handleCancelView = () => {
    setIsViewModalVisible(false);
    setViewingUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="sm:ml-4">
        <Button
          onClick={() => navigate(-1)}
          className="text-gray-600 border-gray-300"
        >
          Back
        </Button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Users</h1>
        {/* Filters */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          tabBarGutter={1}
          className="mb-6 font-semibold"
          moreIcon={null}
        >
          {["All", "Active", "Pending", "Blocked"].map((status) => (
            <TabPane
              tab={
                <span
                  className={`px-4 py-1 rounded-full hover:bg-${
                    status === "Active"
                      ? "green-50 text-green-600"
                      : status === "Pending"
                      ? "yellow-50 text-yellow-600"
                      : status === "Blocked"
                      ? "red-50 text-red-500"
                      : "gray-100"
                  } transition-all text-shadow-md`}
                >
                  {status}{" "}
                  <span className="text-gray-500">
                    ({counts[status as keyof typeof counts]})
                  </span>
                </span>
              }
              key={status}
            />
          ))}
        </Tabs>

        {/* Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-6">
          <SearchBar
            value={searchText}
            onChange={setSearchText}
            placeholder={"Search by name or email..."}
          />
        </div>

        {/* Users Table */}
        {loading ? (
          <Loader
            tip="Fetching users..."
            fullScreen={window.innerWidth < 640}
          />
        ) : (
          <Table
            columns={userTableColumns({ handleEdit, handleDelete, handleView })}
            dataSource={filteredUsers}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
            className="custom-table"
          />
        )}
      </div>

      {/* Edit User Modal */}
      <UserEditModal
        visible={isEditModalVisible}
        user={editingUser}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />

      {/* View User Modal */}
      <UserViewModal
        visible={isViewModalVisible}
        user={viewingUser}
        onCancel={handleCancelView}
      />
    </div>
  );
};

export default Users;
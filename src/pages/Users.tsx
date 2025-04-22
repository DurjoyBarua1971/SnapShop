import { useState, useEffect } from "react";
import { message } from "antd";
import usersData from "../data/usersData.json";
import UserEditModal from "../components/User/UserEditModal";
import SearchBar from "../components/SearchBar";
import { User } from "../types/user";
import UserViewModal from "../components/User/UserViewModal";
import UserStatusTabs from "../components/User/UserStatusTabs";
import BackButton from "../components/BackButton";
import UsersTable from "../components/User/UserTable";

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

    if (activeTab !== "All") {
      filtered = filtered.filter((user) => user.status === activeTab);
    }

    if (searchText) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [activeTab, searchText, users]);

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

  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
    message.success("User deleted successfully!");
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = (values: Partial<User>) => {
    setUsers(
      users.map((user) =>
        user.id === editingUser?.id ? { ...user, ...values } : user
      )
    );
    setIsEditModalVisible(false);
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setEditingUser(null);
  };

  const handleView = (user: User) => {
    setViewingUser(user);
    setIsViewModalVisible(true);
  };

  const handleCancelView = () => {
    setIsViewModalVisible(false);
    setViewingUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 !font-poppins">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Users</h1>
        <UserStatusTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          counts={counts}
        />

        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder={"Search by name or email..."}
        />

        <UsersTable
          users={filteredUsers}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>

      <UserEditModal
        visible={isEditModalVisible}
        user={editingUser}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />

      <UserViewModal
        visible={isViewModalVisible}
        user={viewingUser}
        onCancel={handleCancelView}
      />
    </div>
  );
};

export default Users;

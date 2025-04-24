import { useState, useEffect } from "react";
import { Button, message } from "antd";
import { Voucher } from "../types/voucher";
import SearchBar from "../components/SearchBar";
import BackButton from "../components/BackButton";
import VoucherStatusTabs from "../components/Discount/VoucherStatusTabs";
import VoucherTable from "../components/Discount/VoucherTable";
import mockVouchers from "../data/voucherData.json";

const Discount = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadVouchers = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data: Voucher[] = mockVouchers as Voucher[];
      setVouchers(data);
      setFilteredVouchers(data);
      setLoading(false);
    };
    loadVouchers();
  }, []);

  // Filter vouchers based on tab and search text
  useEffect(() => {
    let filtered = vouchers;

    if (activeTab !== "All") {
      filtered = filtered.filter((voucher) => voucher.status === activeTab);
    }

    if (searchText) {
      filtered = filtered.filter(
        (voucher) =>
          voucher.code.toLowerCase().includes(searchText.toLowerCase()) ||
          voucher.id.toString().includes(searchText)
      );
    }

    setFilteredVouchers(filtered);
  }, [activeTab, searchText, vouchers]);

  const counts = vouchers.reduce(
    (acc, voucher) => {
      acc.All += 1;
      if (voucher.status in acc) {
        acc[voucher.status as keyof typeof acc] += 1;
      }
      return acc;
    },
    { All: 0, Active: 0, Expired: 0 }
  );

  const handleDelete = (voucherId: number) => {
    setVouchers(vouchers.filter((voucher) => voucher.id !== voucherId));
    message.success("Voucher deleted successfully");
  };

  const handleCreate = (voucher: Omit<Voucher, "id" | "status">) => {
    const newVoucher: Voucher = {
      ...voucher,
      id: Math.floor(Math.random() * 1000),
      status:
        new Date(voucher.expirationDate) > new Date() ? "Active" : "Expired",
    };
    setVouchers([...vouchers, newVoucher]);
    message.success("Voucher created successfully");
  };

  const handleUpdate = (updatedVoucher: Voucher) => {
    setVouchers(
      vouchers.map((voucher) =>
        voucher.id === updatedVoucher.id
          ? {
              ...updatedVoucher,
              status:
                new Date(updatedVoucher.expirationDate) > new Date()
                  ? "Active"
                  : "Expired",
            }
          : voucher
      )
    );
    message.success("Voucher updated successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 !font-poppins">
      <div className="container mx-auto sm:px-2 lg:px-16 py-6 space-y-8">
        <div className="flex justify-between">
          <BackButton />
          <Button
            type="primary"
            onClick={() => setIsCreateModalOpen(true)}
            className="!bg-green-600 !text-white !font-poppins hover:!bg-green-700"
          >
            Create Voucher
          </Button>
        </div>
        <h1 className="!text-3xl !font-semibold !text-gray-800 !font-poppins">
          Discounts
        </h1>

        <VoucherStatusTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          counts={counts}
        />

        <SearchBar
          value={searchText}
          onChange={setSearchText}
          placeholder="Search voucher code or ID..."
        />

        <VoucherTable
          vouchers={filteredVouchers}
          loading={loading}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          isCreateModalOpen={isCreateModalOpen}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
      </div>
    </div>
  );
};

export default Discount;

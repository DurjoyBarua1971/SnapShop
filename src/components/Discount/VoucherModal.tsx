import React, { useState, useEffect } from "react";
import { Voucher } from "../../types/voucher";

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (voucher: Voucher) => void;
  initialData?: Voucher;
}

const VoucherModal: React.FC<VoucherModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Voucher>({
    code: "",
    type: "percentage",
    value: 0,
    expirationDate: "",
    maxUsesPerUser: 0,
    status: "Active",
    id: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        status: initialData.status,
        code: initialData.code,
        type: initialData.type,
        value: initialData.value,
        expirationDate: initialData.expirationDate,
        maxUsesPerUser: initialData.maxUsesPerUser,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "value" || name === "maxUsesPerUser" ? Number(value) : value,
      status:
        name === "expirationDate"
          ? new Date(value) < new Date()
            ? "Expired"
            : "Active"
          : prev.status,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md !font-poppins">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 !font-poppins">
          {initialData ? "Update Voucher" : "Create Voucher"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 !font-poppins mb-2">
              Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 !font-poppins p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 !font-poppins mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 !font-poppins p-2"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 !font-poppins mb-2">
              Value ($)
            </label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 !font-poppins p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 !font-poppins mb-2">
              Expiration Date
            </label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 !font-poppins p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 !font-poppins mb-2">
              Max Uses Per User
            </label>
            <input
              type="number"
              name="maxUsesPerUser"
              value={formData.maxUsesPerUser}
              onChange={handleChange}
              className="mt-1 block w-full !border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:!border-green-500 !font-poppins p-2"
              required
            />
          </div>
          <div className="flex justify-end !space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 !text-gray-700 rounded-md hover:!bg-gray-300 !font-poppins"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 !text-white rounded-md hover:!bg-green-700 !font-poppins"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoucherModal;

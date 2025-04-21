import { Modal, Form, Input as AntInput, Select, message } from "antd";
import { User } from "../types/user";

const { Option } = Select;

interface UserEditModalProps {
  visible: boolean;
  user: User | null;
  onSave: (values: Partial<User>) => void;
  onCancel: () => void;
}

const UserEditModal = ({
  visible,
  user,
  onSave,
  onCancel,
}: UserEditModalProps) => {
  const [form] = Form.useForm();

  // Populate form with user data when the modal opens
  if (user && visible) {
    form.setFieldsValue(user);
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
        message.success("User updated successfully");
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // List of countries (simplified for demo; you can expand this list)
  const countries = [
    "Sweden",
    "United States",
    "United Kingdom",
    "Germany",
    "France",
    "Bangladesh",
    "India",
    "Pakistan",
    "Nepal",
    "Sri Lanka",
    "China",
    "Japan",
    "South Korea",
    "Australia",
  ];

  return (
    <Modal
      title="Edit User"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Save Changes"
      cancelText="Cancel"
      okButtonProps={{ className: "bg-gray-800 text-white hover:bg-gray-700" }}
    >
      <Form
        form={form}
        layout="vertical"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[
            { required: true, message: "Please enter the user's full name" },
          ]}
        >
          <AntInput placeholder="Enter full name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter the user's email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <AntInput placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter the user's phone number" },
          ]}
        >
          <AntInput placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Please select a country" }]}
        >
          <Select placeholder="Select country">
            {countries.map((country) => (
              <Option key={country} value={country}>
                {country}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="state"
          label="State/Region"
          rules={[{ required: true, message: "Please enter the state/region" }]}
        >
          <AntInput placeholder="Enter state/region" />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "Please enter the city" }]}
        >
          <AntInput placeholder="Enter city" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter the address" }]}
        >
          <AntInput placeholder="Enter address" />
        </Form.Item>
        <Form.Item
          name="zipCode"
          label="Zip/Code"
          rules={[{ required: true, message: "Please enter the zip code" }]}
        >
          <AntInput placeholder="Enter zip code" />
        </Form.Item>
        <Form.Item
          name="company"
          label="Company"
          rules={[{ required: true, message: "Please enter the company name" }]}
        >
          <AntInput placeholder="Enter company name" />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select placeholder="Select role">
            <Option value="Customer">Customer</Option>
            <Option value="Admin">Admin</Option>
            <Option value="Support">Support</Option>
            <Option value="Content Creator">Content Creator</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select placeholder="Select status">
            <Option value="Active">Active</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Blocked">Blocked</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserEditModal;

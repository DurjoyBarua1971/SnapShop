import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SearchBar = ({ value, placeholder, onChange }: SearchBarProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-6">
    <Input
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="!w-[250px] !mx-auto sm:!mx-0 sm:!w-xl !font-inter"
    />
  </div>
);

export default SearchBar;

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SearchBar = ({ value, placeholder, onChange }: SearchBarProps) => (
  <Input
    placeholder={placeholder}
    prefix={<SearchOutlined />}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full sm:w-64 custom-input"
  />
);

export default SearchBar;

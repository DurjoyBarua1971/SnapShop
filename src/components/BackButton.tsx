import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => navigate(-1)}
        className="text-gray-600 border-gray-300 !font-poppins"
      >
        Back
      </Button>
    </div>
  );
};

export default BackButton;

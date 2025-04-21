import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoaderProps {
    size?: "small" | "default" | "large";
    tip?: string;
    fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
    size = "large",
    tip = "Loading...",
    fullScreen = false,
}) => {
    const spinnerIcon = <LoadingOutlined style={{ fontSize: 32, color: "#16a34a" }} spin />;

    return (
        <div
            className={`flex flex-col items-center justify-center font-poppins ${fullScreen ? "fixed inset-0 bg-gray-50/80 z-50" : ""
                }`}
        >
            <Spin indicator={spinnerIcon} size={size} />
            {tip && (
                <p className="mt-4 text-gray-800 text-base font-medium">{tip}</p>
            )}
        </div>
    );
};

export default Loader;
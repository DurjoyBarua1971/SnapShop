import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Tag, Timeline, Button, Space, message } from "antd";
import { PrinterOutlined, EditOutlined } from "@ant-design/icons";
import orderDetailsData from "../data/orderDetailsData.json";
import Loader from "../components/Loader";
import moment from "moment";

interface Product {
    name: string;
    sku: string;
    image: string;
    quantity: number;
    price: number;
}

interface Customer {
    name: string;
    email: string;
    avatar: string;
    ipAddress: string;
}

interface Shipping {
    address: string;
    phone: string;
    shipBy: string;
    speed: string;
    trackingNo: string;
}

interface Payment {
    method: string;
    lastFour: string;
}

interface HistoryEvent {
    event: string;
    date: string;
    status: string;
}

interface OrderDetails {
    id: number;
    status: string;
    date: string;
    details: {
        product: Product;
        subtotal: number;
        shipping: number;
        discount: number;
        taxes: number;
        total: number;
    };
    customer: Customer;
    shipping: Shipping;
    payment: Payment;
    history: HistoryEvent[];
}

const OrderDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const loadOrder = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
            const data: OrderDetails[] = orderDetailsData;
            const foundOrder = data.find((o) => o.id === Number(id));
            if (foundOrder) {
                setOrder(foundOrder);
            } else {
                message.error("Order not found");
                navigate("/order");
            }
            setLoading(false);
        };
        loadOrder();
    }, [id, navigate]);

    if (loading) {
        return <Loader tip="Fetching order details..." fullScreen={window.innerWidth < 640} />;
    }

    if (!order) {
        return null;
    }

    const handleBlacklist = () => {
        message.success(`${order.customer.name} has been added to the blacklist`);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 font-poppins">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800">
                            Order #{order.id}
                            <Tag
                                color={
                                    order.status === "Completed"
                                        ? "green"
                                        : order.status === "Pending"
                                            ? "gold"
                                            : order.status === "Cancelled"
                                                ? "red"
                                                : "gray"
                                }
                                className="ml-2"
                            >
                                {order.status}
                            </Tag>
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {moment(order.date).format("DD MMM YYYY h:mm a")}
                        </p>
                    </div>
                    <Space>
                        <Button
                            icon={<PrinterOutlined />}
                            onClick={handlePrint}
                            className="text-gray-600 border-gray-300"
                        >
                            Print
                        </Button>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => message.info("Edit functionality not implemented")}
                            className="text-gray-600 border-gray-300"
                        >
                            Edit
                        </Button>
                    </Space>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section: Details and History */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Details */}
                        <Card
                            title="Details"
                            className="bg-white border-gray-200 shadow-sm rounded-xl"
                            bodyStyle={{ padding: "16px" }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <img
                                        src={order.details.product.image}
                                        alt={order.details.product.name}
                                        className="w-12 h-12 rounded-lg mr-4"
                                    />
                                    <div>
                                        <p className="text-gray-800 font-medium">{order.details.product.name}</p>
                                        <p className="text-gray-500 text-sm">{order.details.product.sku}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-800 font-medium">
                                        x{order.details.product.quantity}
                                    </p>
                                    <p className="text-gray-800 font-semibold">
                                        ${order.details.product.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Subtotal</p>
                                    <p className="text-gray-800">${order.details.subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Shipping</p>
                                    <p className="text-gray-800">${order.details.shipping.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Discount</p>
                                    <p className="text-gray-800">${order.details.discount.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Taxes</p>
                                    <p className="text-gray-800">${order.details.taxes.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <p className="text-gray-800 font-semibold">Total</p>
                                    <p className="text-gray-800 font-semibold">
                                        ${order.details.total.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* History */}
                        <Card
                            title="History"
                            className="bg-white border-gray-200 shadow-sm rounded-xl"
                            bodyStyle={{ padding: "16px" }}
                        >
                            <Timeline>
                                {order.history.map((event, index) => (
                                    <Timeline.Item
                                        key={index}
                                        color={
                                            event.status === "success"
                                                ? "green"
                                                : event.status === "error"
                                                    ? "red"
                                                    : "blue"
                                        }
                                    >
                                        <p className="text-gray-800">{event.event}</p>
                                        <p className="text-gray-500 text-sm">
                                            {moment(event.date).format("DD MMM YYYY h:mm a")}
                                        </p>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                        </Card>
                    </div>

                    {/* Right Section: Customer Info, Shipping, Payment */}
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <Card
                            title="Customer Info"
                            className="bg-white border-gray-200 shadow-sm rounded-xl"
                            bodyStyle={{ padding: "16px" }}
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={order.customer.avatar}
                                    alt={order.customer.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <p className="text-gray-800 font-medium">{order.customer.name}</p>
                                    <p className="text-gray-500 text-sm">{order.customer.email}</p>
                                    <p className="text-gray-500 text-sm">IP address: {order.customer.ipAddress}</p>
                                </div>
                            </div>
                            <Button
                                type="link"
                                danger
                                onClick={handleBlacklist}
                                className="p-0"
                            >
                                + Add to Blacklist
                            </Button>
                        </Card>

                        {/* Shipping and Payment */}
                        <Card
                            title="Shipping"
                            className="bg-white border-gray-200 shadow-sm rounded-xl"
                            bodyStyle={{ padding: "16px" }}
                        >
                            <div className="space-y-2">
                                <div>
                                    <p className="text-gray-600 text-sm">Address</p>
                                    <p className="text-gray-800">{order.shipping.address}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Phone number</p>
                                    <p className="text-gray-800">{order.shipping.phone}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Ship by</p>
                                    <p className="text-gray-800">{order.shipping.shipBy}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Speedy</p>
                                    <p className="text-gray-800">{order.shipping.speed}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Tracking No.</p>
                                    <p className="text-gray-800">{order.shipping.trackingNo}</p>
                                </div>
                                <div className="border-t pt-2">
                                    <p className="text-gray-600 text-sm">Payment</p>
                                    <p className="text-gray-800 flex items-center">
                                        {order.payment.method}
                                        {order.payment.method === "Credit Card" && (
                                            <span className="ml-2 text-gray-500">•••• {order.payment.lastFour}</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
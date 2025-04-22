import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCategories, addProduct } from "../api/products";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Radio,
  Card,
  message,
  Space,
  Row,
  Col,
  Collapse,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { AddProductParams } from "../types/product";

const { Panel } = Collapse;

const AddProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Mutation to add a new product
  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      message.success("Product added successfully!");
      navigate("/product");
    },
    onError: (error: Error) => {
      message.error("Failed to add product. Please try again.");
      console.error("Add product error:", error);
    },
  });

  // Handle form submission
  const onFinish = (values: any) => {
    console.log("Add Product:", values);
    const productData: AddProductParams = {
      title: values.title,
      description: values.description,
      category: values.category,
      price: values.price,
      discountPercentage: values.discountPercentage || 0,
      stock: values.stock || 0,
      tags: values.tags || [],
      brand: values.brand,
      sku: values.sku,
      weight: values.weight || 0,
      dimensions: {
        width: values.dimensions?.width || 0,
        height: values.dimensions?.height || 0,
        depth: values.dimensions?.depth || 0,
      },
      warrantyInformation: values.warrantyInformation || "No warranty",
      shippingInformation: values.shippingInformation || "Ships in 1-2 weeks",
      returnPolicy: values.returnPolicy || "No return policy",
      minimumOrderQuantity: values.minimumOrderQuantity || 1,
      images: values.images?.length
        ? values.images
        : [
            "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
          ],
      thumbnail:
        values.thumbnail ||
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
      isPublished: values.status === "published",
    };
    addProductMutation.mutate(productData);
  };

  return (
    <div className="min-h-screen bg-gray-50 !font-poppins">
      <div className="sm:ml-4">
        <Button
          onClick={() => navigate("/product")}
          className="text-gray-600 border-gray-300 !font-poppins"
        >
          Back
        </Button>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl !font-semibold text-gray-800 mb-6 ">
          Add New Product
        </h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            status: "draft",
            discountPercentage: 0,
            stock: 0,
            weight: 0,
            minimumOrderQuantity: 1,
            warrantyInformation: "1 month warranty",
            shippingInformation: "Ships in 1 month",
            returnPolicy: "30 days return policy",
            dimensions: { width: 0, height: 0, depth: 0 },
          }}
        >
          <Collapse defaultActiveKey={["1", "2", "3", "4"]} className="!mb-6">
            {/* Basic Information */}
            <Panel header="Basic Information" key="1" className="!font-poppins">
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the product title",
                      },
                    ]}
                    className="!font-poppins"
                  >
                    <Input placeholder="e.g., Essence Mascara Lash Princess" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                      { required: true, message: "Please select a category" },
                    ]}
                  >
                    <Select
                      placeholder="Select a category"
                      loading={categoriesLoading}
                      showSearch
                    >
                      {categories.map((category) => (
                        <Select.Option key={category} value={category}>
                          {category}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter a description" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="e.g., The Essence Mascara Lash Princess is a popular mascara known for its valorizing and lengthening effects."
                />
              </Form.Item>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[
                      { required: true, message: "Please enter the brand" },
                    ]}
                  >
                    <Input placeholder="e.g., Essence" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="SKU"
                    name="sku"
                    rules={[
                      { required: true, message: "Please enter the SKU" },
                    ]}
                  >
                    <Input placeholder="e.g., RCH45Q1A" />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>

            {/* Pricing and Inventory */}
            <Panel header="Pricing and Inventory" key="2">
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      { required: true, message: "Please enter the price" },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      step={0.01}
                      placeholder="e.g., 9.99"
                      style={{ width: "100%" }}
                      formatter={(value) => `$ ${value}`}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Discount Percentage"
                    name="discountPercentage"
                  >
                    <InputNumber
                      min={0}
                      max={100}
                      step={0.01}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[
                      { required: true, message: "Please enter the price" },
                    ]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Minimum Order Quantity"
                    name="minimumOrderQuantity"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the minimum order quantity",
                      },
                    ]}
                    tooltip="The minimum quantity a customer must order"
                  >
                    <InputNumber min={1} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Weight (kg)" name="weight">
                    <InputNumber min={0} step={0.1} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>

            {/* Dimensions and Policies */}
            <Panel header="Dimensions and Policies" key="3">
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item label="Width (cm)" name={["dimensions", "width"]}>
                    <InputNumber
                      min={0}
                      step={0.01}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Height (cm)"
                    name={["dimensions", "height"]}
                  >
                    <InputNumber
                      min={0}
                      step={0.01}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Depth (cm)" name={["dimensions", "depth"]}>
                    <InputNumber
                      min={0}
                      step={0.01}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Warranty Information"
                    name="warrantyInformation"
                  >
                    <Input placeholder="e.g., 1 month warranty" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Shipping Information"
                    name="shippingInformation"
                  >
                    <Input placeholder="e.g., Ships in 1 month" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Return Policy" name="returnPolicy">
                    <Input placeholder="e.g., 30 days return policy" />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>

            {/* Images and Tags */}
            <Panel header="Images and Tags" key="4">
              <Form.Item
                label="Thumbnail URL"
                name="thumbnail"
                className="max-w-lg"
              >
                <Input placeholder="e.g., https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png" />
              </Form.Item>
              <Form.List name="images">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex" }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name]}
                          rules={[
                            {
                              required: true,
                              message: "Please enter an image URL",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Image URL"
                            className="!w-48 sm:!w-lg"
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          className="!text-red-500"
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Image URL
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.List name="tags">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} className="!flex" align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name]}
                          rules={[
                            { required: true, message: "Please enter a tag" },
                          ]}
                        >
                          <Input placeholder="Tag" style={{ width: 200 }} />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          className="!text-red-500"
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Tag
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Panel>
          </Collapse>

          {/* Publish/Draft Status */}
          <Card className="!mb-6">
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Radio.Group>
                <Radio value="draft">Draft</Radio>
                <Radio value="published">Publish</Radio>
              </Radio.Group>
            </Form.Item>
          </Card>

          {/* Form Actions */}
          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={addProductMutation.isPending}
              >
                Save
              </Button>
              <Button onClick={() => navigate("/product")}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;

import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchProductById,
  updateProduct,
} from "../api/products";
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
  Spin,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { AddProductParams } from "../types/product";
import BackButton from "../components/BackButton";

const { Panel } = Collapse;

const EditProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch product data
  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Mutation to update the product
  const updateProductMutation = useMutation({
    mutationFn: (data: AddProductParams) => updateProduct(Number(id), data),
    onSuccess: () => {
      message.success("Product updated successfully!");
      navigate("/product");
    },
    onError: (error: Error) => {
      message.error("Failed to update product. Please try again.");
      console.error("Update product error:", error);
    },
  });

  // Handle form submission
  const onFinish = (values: any) => {
    console.log("Update Product:", values);
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
      isPublished: true,
    };
    updateProductMutation.mutate(productData);
  };

  const handleUpdate = () => {
    form.resetFields();
    message.success("Product updated successfully.");
    navigate("/product");
  };

  // Pre-populate form with product data
  const initialValues = product
    ? {
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        tags: product.tags,
        brand: product.brand,
        sku: product.sku,
        weight: product.weight,
        dimensions: {
          width: product.dimensions.width,
          height: product.dimensions.height,
          depth: product.dimensions.depth,
        },
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        returnPolicy: product.returnPolicy,
        minimumOrderQuantity: product.minimumOrderQuantity,
        images: product.images,
        thumbnail: product.thumbnail,
        status: "published",
      }
    : {};

  return (
    <div className="min-h-screen !bg-gray-50 !font-poppins">
      <div className="container mx-auto sm:px-2 lg:px-16 py-6 space-y-8">
        <BackButton />
        <div className="mx-auto py-6">
          <h1 className="text-3xl !font-semibold !text-gray-800 !mb-6">
            Edit Product
          </h1>
          {productLoading ? (
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          ) : (
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={initialValues}
            >
              <Collapse
                defaultActiveKey={["1", "2", "3", "4"]}
                className="!mb-6"
              >
                {/* Basic Information */}
                <Panel
                  header="Basic Information"
                  key="1"
                  className="!font-poppins"
                >
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
                          {
                            required: true,
                            message: "Please select a category",
                          },
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
                      placeholder="e.g., The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects."
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
                          {
                            required: true,
                            message: "Please enter the stock quantity",
                          },
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
                        <InputNumber
                          min={0}
                          step={0.1}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Panel>

                {/* Dimensions and Policies */}
                <Panel header="Dimensions and Policies" key="3">
                  <Row gutter={16}>
                    <Col xs={24} md={8}>
                      <Form.Item
                        label="Width (cm)"
                        name={["dimensions", "width"]}
                      >
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
                      <Form.Item
                        label="Depth (cm)"
                        name={["dimensions", "depth"]}
                      >
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
                    className="!max-w-lg"
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
                            className="!mb-4"
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
                                className="!w-48 sm:!w-96"
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
                                  message: "Please enter a tag",
                                },
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
                  rules={[
                    { required: true, message: "Please select a status" },
                  ]}
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
                    loading={updateProductMutation.isPending}
                  >
                    Save
                  </Button>
                  <Button onClick={() => handleUpdate}>Cancel</Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

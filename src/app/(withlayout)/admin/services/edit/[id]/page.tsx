"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOption,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import { availabilityOption, statusOption } from "@/constants/global";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { Button, Col, Row, message } from "antd";
import axios from "axios";

const ServiceEditPage = ({ params }: any) => {
  const { data: serviceData, isLoading: loading } = useServiceQuery(params?.id);
  console.log(serviceData);
  const { data, isLoading } = useCategoriesQuery({
    limit: 100,
    page: 1,
  });

  const categories = data?.categories;
  const categoryOptions = categories?.map((category) => {
    return {
      label: category?.title,
      value: category?.id,
    };
  });
  const [updateService] = useUpdateServiceMutation();
  const onSubmit = async (data: any) => {
    message.loading("updating........");
    try {
      const formData = new FormData();
      if (Array.isArray(data.image) && data.image.length > 0) {
        formData.append("image", data.image[0]);
        formData.append("key", "48205bb1e9d5edb8bc197ab3a6951a4b"); // Replace with your ImageBB API key
        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );
        const imageUrl = response.data.data.url;
        if (imageUrl) {
          data.image = imageUrl;
        }
      }
      data.price = parseInt(data.price);
      const res = await updateService({ id: params?.id, body: data }).unwrap();
      console.log(res);
      if (res.id) {
        message.success("Service update in successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const defaultValues = {
    title: serviceData?.title || "",
    price: serviceData?.price || "",
    status: serviceData?.status || "",
    availability: serviceData?.availability || true,
    categoryId: serviceData?.categoryId || "",
    description: serviceData?.description || "",
  };

  return (
    <div>
      <UmBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "services",
            link: "/admin/services",
          },
        ]}
      />
      <h1>update new service</h1>
      <div>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              User Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  label="Title"
                  size="large"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="price"
                  label="Price"
                  size="large"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="status"
                  options={statusOption as SelectOption[]}
                  label="Status"
                  placeholder="Select Status"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="availability"
                  options={availabilityOption as SelectOption[]}
                  label="Status"
                  placeholder="Select Status"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="categoryId"
                  options={categoryOptions as SelectOption[]}
                  label="Category"
                  placeholder="Select Category"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  name="image"
                  type="file"
                  size="large"
                  label="Image"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea name="description" label="Description" rows={4} />
              </Col>
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ServiceEditPage;

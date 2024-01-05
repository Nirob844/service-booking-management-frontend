"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import { useAddCategoryMutation } from "@/redux/api/categoryApi";
import { Button, Col, Row, message } from "antd";
import axios from "axios";

const CreateCategoryPage = () => {
  const [addCategory] = useAddCategoryMutation();

  const onSubmit = async (data: any) => {
    console.log(data);
    message.loading("creating.............");
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
      const res = await addCategory({ ...data }).unwrap();
      if (res.id) {
        message.success(" create category in successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
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
            label: "categories",
            link: "/admin/categories",
          },
        ]}
      />
      <h1 className="my-5">create new category</h1>
      <div>
        <Form submitHandler={onSubmit}>
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
              Category Information
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
                  type="file"
                  name="image"
                  label="Image"
                  size="large"
                />
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

export default CreateCategoryPage;

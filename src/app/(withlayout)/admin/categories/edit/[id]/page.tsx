"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import {
  useCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { Button, Col, Row, message } from "antd";

const CategoryEditPage = ({ params }: any) => {
  const { data: categoryData, isLoading: loading } = useCategoryQuery(
    params?.id
  );
  const [updateCategory] = useUpdateCategoryMutation();
  const onSubmit = async (data: any) => {
    message.loading("updating........");
    try {
      const res = await updateCategory({ id: params?.id, body: data }).unwrap();
      if (res.id) {
        message.success("Category update in successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const defaultValues = {
    title: categoryData?.title || "",
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
      <h1>update new category</h1>
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

export default CategoryEditPage;

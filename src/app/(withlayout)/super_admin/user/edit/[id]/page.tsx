"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import { userOption } from "@/constants/global";
import { useUpdateUserMutation, useUserQuery } from "@/redux/api/userApi";
import { Button, Col, Row, message } from "antd";
import axios from "axios";

const UserEditPage = ({ params }: any) => {
  const { data: userData, isLoading: loading } = useUserQuery(params?.id);

  const [updateUser] = useUpdateUserMutation();
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
      const res = await updateUser({ id: params?.id, body: data }).unwrap();
      console.log(res);
      if (res.id) {
        message.success("User update in successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const defaultValues = {
    name: userData?.name || "",
    email: userData?.email || "",
    role: userData?.role || "",
  };

  return (
    <div>
      <UmBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "user",
            link: "/super_admin/user",
          },
        ]}
      />
      <h1>create new user</h1>
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
                <FormInput type="text" name="name" label="Name" size="large" />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="email"
                  name="email"
                  label="Email"
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
                  options={userOption}
                  size="large"
                  name="role"
                  label="Role"
                  placeholder="Select"
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

export default UserEditPage;

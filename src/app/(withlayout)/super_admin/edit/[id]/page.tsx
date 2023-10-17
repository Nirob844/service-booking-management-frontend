"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import UploadImage from "@/components/ui/uploadImage";
import { useUpdateProfileMutation } from "@/redux/api/profileApi";
import { useUserQuery } from "@/redux/api/userApi";
import { Button, Col, Row, message } from "antd";

const EditProfilePage = ({ params }: any) => {
  const { data: userData } = useUserQuery(params?.id);
  const [updateProfile] = useUpdateProfileMutation();
  const onSubmit = async (data: any) => {
    message.loading("updating........");
    try {
      const res = await updateProfile({ body: data }).unwrap();
      console.log(res);
      if (res.id) {
        message.success("Profile update in successfully");
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
            label: "Home",
            link: "/",
          },
          {
            label: "profile",
            link: "/profile",
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
                <UploadImage />
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

export default EditProfilePage;

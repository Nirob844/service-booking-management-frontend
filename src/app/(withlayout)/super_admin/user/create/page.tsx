"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import UploadImage from "@/components/ui/uploadImage";
import { userOption } from "@/constants/global";
import { useUserRegistrationMutation } from "@/redux/api/authApi";
import { Button, Col, Row, message } from "antd";
import axios from "axios";

const CreateUserPage = () => {
  const [userRegistration] = useUserRegistrationMutation();

  const onSubmit = async (data: any) => {
    message.loading("creating.............");
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      console.log(formData);
      formData.append("key", "48205bb1e9d5edb8bc197ab3a6951a4b"); // Replace with your ImageBB API key
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      const imageUrl = response.data.data.url;

      // Add the image URL to the data object
      data.image = imageUrl;
      console.log(data);
      const res = await userRegistration({ ...data }).unwrap();
      console.log(res);
      if (res.id) {
        message.success("User registration in successfully");
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
                <FormInput
                  type="password"
                  name="password"
                  label="Password"
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

export default CreateUserPage;

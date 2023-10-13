"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserRegistrationMutation } from "@/redux/api/authApi";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import RegistrationImage from "../../assets/login-image.png";

type FormValues = {
  email: string;
  password: string;
};

const RegistrationPage = () => {
  const [userRegistration] = useUserRegistrationMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("data", data);
    try {
      const res = await userRegistration({ ...data }).unwrap();
      console.log(res);
      if (res.id) {
        router.push("/login");
        message.success("User registration in successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={RegistrationImage} width={500} alt="Registration image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h2
          style={{
            margin: "15px 0",
          }}
        >
          Registration new account
        </h2>
        <div>
          <Form submitHandler={onSubmit}>
            <div
              style={{
                margin: "15px 0",
              }}
            >
              <FormInput
                name="name"
                type="text"
                size="large"
                label="User Name"
              />
            </div>
            <div>
              <FormInput
                name="email"
                type="email"
                size="large"
                label="User Email"
              />
            </div>
            <div
              style={{
                margin: "15px 0",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
              />
            </div>
            <Button type="primary" htmlType="submit">
              SignUp
            </Button>
          </Form>
          <p
            style={{
              marginTop: "10px",
            }}
          >
            Already have an account <Link href={"login"}>Please Login</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default RegistrationPage;

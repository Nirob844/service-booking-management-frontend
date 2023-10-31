"use client";
import { useAddFaqMutation } from "@/redux/api/faqApi";
import { Button, Col, Form, Input, Layout, Row, message } from "antd";
import Image from "next/image";
import faqImage from "../../assets/images/other/FAQs-pana.png";

const { Content } = Layout;

const FaqForm = () => {
  const [addFaq] = useAddFaqMutation();
  // const { data, isLoading } = useFeedbacksQuery(undefined);

  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    message.loading("creating ...");

    try {
      const res = await addFaq({ ...values }).unwrap();

      if (res.id) {
        message.success(" faq in successfully");
        form.resetFields();
      } else {
        message.error("somewhere went wrong");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <Layout>
      <Content style={{ textAlign: "center" }}>
        <h2 className="my-3">Any Question</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={24} md={12} lg={8}>
            <div className="m-10">
              <Form
                onFinish={onFinish}
                style={{ maxWidth: "500px", margin: "0 auto" }}
              >
                <Form.Item
                  name="question"
                  label="Question"
                  rules={[
                    { required: true, message: "Please enter your question." },
                  ]}
                >
                  <Input.TextArea rows={5} placeholder="Enter your question" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <Image src={faqImage} alt="faq" width={300} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default FaqForm;

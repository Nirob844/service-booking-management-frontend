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
      <Content style={{ padding: "50px", textAlign: "center", margin: "auto" }}>
        <h2 className="my-3">Any Question</h2>
        <Row>
          <Col sm={12} md={8} lg={8}>
            <div className="mt-20">
              <Form onFinish={onFinish} style={{ maxWidth: "500px" }}>
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
          <Col sm={12} md={16} lg={10}>
            <Image className="ml-20" src={faqImage} alt="faq" width={500} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default FaqForm;

"use client";
import Loading from "@/app/loading";
import {
  useAddFeedbackMutation,
  useFeedbacksQuery,
} from "@/redux/api/feedbackApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Col, Form, Input, Layout, Row, message } from "antd";
import Image from "next/image";
import feedbackImage from "../../assets/images/other/Customer feedback-amico.png";

const { Content } = Layout;

const FeedbackForm = () => {
  const [addFeedback] = useAddFeedbackMutation();
  const { data, isLoading } = useFeedbacksQuery(undefined);

  if (isLoading) {
    <Loading />;
  }
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    message.loading("creating ...");
    const { userId } = getUserInfo() as any;
    // Handle form submission
    const feedbackData = {
      userId,
      comment: values.comments, // Match the key to the data structure
    };

    try {
      const res = await addFeedback({ ...feedbackData }).unwrap();

      if (res.id) {
        message.success(" feedback in successfully");
        form.resetFields();
      } else {
        message.error("somewhere went wrong");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const recentFeedback = data?.slice(0, 3).map((feedback: any) => (
    <div key={feedback.id}>
      <Card className="m-10" title="Feedback" bordered={false}>
        <h3>Name: {feedback.user.name}</h3>
        <p>Comment: {feedback.comment}</p>
      </Card>
    </div>
  ));

  return (
    <Layout>
      <Content
        style={{
          textAlign: "center",
        }}
      >
        <h2 className="my-3">Feedback Form</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col sm={12} md={12} lg={8}>
            <Image src={feedbackImage} alt="feedback" width={300} />
          </Col>
          <Col sm={24} md={12} lg={8}>
            <div className="m-10">
              <Form
                onFinish={onFinish}
                style={{ maxWidth: "500px", margin: "0 auto" }}
              >
                <Form.Item
                  name="comments"
                  label="Comments"
                  rules={[
                    { required: true, message: "Please enter your comments." },
                  ]}
                >
                  <Input.TextArea rows={5} placeholder="Enter your comments" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
        <h2 className="mb-3">User Feedback</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-10 gap-y-10">
          {recentFeedback}
        </div>
      </Content>
    </Layout>
  );
};

export default FeedbackForm;

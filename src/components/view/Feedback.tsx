"use client";
import { useAddFeedbackMutation } from "@/redux/api/feedbackApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Form, Input, Layout, message } from "antd";

const { Content } = Layout;

const FeedbackForm = () => {
  const [addFeedback] = useAddFeedbackMutation();
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

  return (
    <Layout>
      <Content style={{ padding: "50px", textAlign: "center" }}>
        <h2 className="mb-3">Feedback Form</h2>
        <Form
          onFinish={onFinish}
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <Form.Item
            name="comments"
            label="Comments"
            rules={[{ required: true, message: "Please enter your comments." }]}
          >
            <Input.TextArea rows={5} placeholder="Enter your comments" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default FeedbackForm;

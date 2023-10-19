"use client";
import { useAddFaqMutation } from "@/redux/api/faqApi";
import { Button, Form, Input, Layout, message } from "antd";

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

  //   const recentFeedback = data?.slice(0, 3).map((feedback: any) => (
  //     <div key={feedback.id}>
  //       <Card title="Feedback" bordered={false}>
  //         <h3>User Name: {feedback.user.name}</h3>
  //         <p>Comment: {feedback.comment}</p>
  //       </Card>
  //     </div>
  //   ));

  return (
    <Layout>
      <Content style={{ padding: "50px", textAlign: "center" }}>
        {/* <h2 className="mb-3">User Feedback</h2>
        <div className="grid grid-cols-3 gap-x-10 gap-y-10">
          {recentFeedback}
        </div> */}
        <h2 className="my-3">Any Question</h2>
        <Form
          onFinish={onFinish}
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Please enter your question." }]}
          >
            <Input.TextArea rows={5} placeholder="Enter your question" />
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

export default FaqForm;

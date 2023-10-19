"use client";
import Form from "@/components/Forms/Form";
import FormTextArea from "@/components/Forms/FormTextArea";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import { useFaqQuery, useUpdateFaqMutation } from "@/redux/api/faqApi";
import { Button, Col, Row, message } from "antd";

const CategoryEditPage = ({ params }: any) => {
  const { data: categoryData, isLoading: loading } = useFaqQuery(params?.id);
  const [updateFaq] = useUpdateFaqMutation();
  const onSubmit = async (data: any) => {
    message.loading("updating........");
    try {
      const res = await updateFaq({ id: params?.id, body: data }).unwrap();
      console.log(res);
      if (res.id) {
        message.success("answer in successfully");
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
            label: "faqs",
            link: "/super_admin/faqs",
          },
        ]}
      />
      <h1>answer question</h1>
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
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea name="answer" label="Answer Question" rows={4} />
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

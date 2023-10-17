"use client";
import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOption,
} from "@/components/Forms/FormSelectField";
import UmBreadCrumb from "@/components/ui/BreadCrumb";
import { bookingOption } from "@/constants/global";
import {
  useBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { Button, Col, Row, message } from "antd";

const BookingEditPage = ({ params }: any) => {
  const { data: bookingData, isLoading: loading } = useBookingQuery(params?.id);
  const [updateBooking] = useUpdateBookingMutation();
  const onSubmit = async (data: any) => {
    message.loading("updating........");
    try {
      const res = await updateBooking({ id: params?.id, body: data }).unwrap();
      if (res.id) {
        message.success("Booking update in successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const defaultValues = {
    status: bookingData?.status || "",
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
            label: "booking",
            link: "/super_admin/bookings",
          },
        ]}
      />
      <h1>update booking</h1>
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
              Booking Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  name="status"
                  label="Status"
                  options={bookingOption as SelectOption[]}
                  size="large"
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

export default BookingEditPage;

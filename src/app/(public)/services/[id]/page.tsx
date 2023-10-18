"use client";
import BookingModal from "@/components/ui/BookingModal";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { Button, Card, Image, Spin, Tag, Typography, message } from "antd";
import { useState } from "react";

const { Title, Paragraph } = Typography;

const ServiceDetailsPage = ({ params }: any) => {
  const { id } = params;
  const { data, isLoading } = useServiceQuery(id);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);

  const [addBooking] = useAddBookingMutation();

  const handleBooking = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      if (!bookingDate) {
        message.error("Please select a booking date.");
        return; // Return early if no booking date is selected
      }

      const bookingData = {
        bookingServices: bookingDate
          ? [
              {
                serviceId: service.id,
                bookingDate: bookingDate,
              },
            ]
          : [],
      };

      const res = await addBooking(bookingData).unwrap();
      console.log(res);
      if (res.id) {
        message.success("Service booked successfully.");
        setIsModalVisible(false);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDateChange = (date: any) => {
    setBookingDate(date); // No need for toDate() here
  };

  if (isLoading) {
    return <Spin spinning={true}>Loading...</Spin>;
  }

  const service = data;
  console.log(service);

  if (!service) {
    return null; // Service not found
  }

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Spin spinning={isLoading}>
        {service && (
          <Card>
            <div className="flex">
              <div className="w-1/2">
                <Image
                  src={service.image}
                  alt="Service Image"
                  style={{ maxWidth: "500px", maxHeight: "500px" }}
                />
              </div>
              <div className="m-10">
                <Title level={3}>{service?.title}</Title>
                <Paragraph>Price: ${service?.price}</Paragraph>
                <Paragraph>
                  Availability:{" "}
                  <Tag color={service?.availability ? "success" : "error"}>
                    {service?.availability ? "Available" : "Not Available"}
                  </Tag>
                </Paragraph>
                <Paragraph>
                  Category:{" "}
                  {service?.category ? service?.category?.title : "N/A"}
                </Paragraph>
                <Paragraph>{service?.description}</Paragraph>
                <Button type="primary" onClick={handleBooking}>
                  Booking
                </Button>
                <BookingModal
                  title="Booking Model"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  setBookingDate={handleDateChange}
                />
              </div>
            </div>
          </Card>
        )}
      </Spin>
    </div>
  );
};

export default ServiceDetailsPage;

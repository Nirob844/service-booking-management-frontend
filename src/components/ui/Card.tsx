"use client";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { Button, Card, Tag, Typography, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "./BookingModal";

const { Meta } = Card;
const { Text } = Typography;

const ServiceCard = ({ service }: any) => {
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

  return (
    <Card
      hoverable
      style={{
        width: 300,
        height: "350px",
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      cover={
        <img
          alt="Service Image"
          src={service.image}
          style={{ borderRadius: "10px 10px 0 0", height: "200px" }}
        />
      }
    >
      <Meta
        title={<span style={{ textDecoration: "none" }}>{service.title}</span>}
        description={
          <>
            <Text strong style={{ textDecoration: "none" }}>
              Price:
            </Text>{" "}
            ${service.price}
            <br />
            <Text strong style={{ textDecoration: "none" }}>
              Availability:
            </Text>
            <Tag color={service.availability ? "success" : "error"}>
              {service.availability ? "Available" : "Not Available"}
            </Tag>
          </>
        }
      />
      <div className="flex mt-3">
        <div>
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
        <div className="ml-3">
          <Link key={service.id} href={`services/${service.id}`}>
            <Button>Details</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;

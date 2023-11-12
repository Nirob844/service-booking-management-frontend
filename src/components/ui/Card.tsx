"use client";
import { useAddAddCartMutation } from "@/redux/api/addCartApi";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Tag, Typography, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BookingModal from "./BookingModal";

const { Meta } = Card;
const { Text } = Typography;

const ServiceCard = ({ service }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);
  const router = useRouter();

  const [addBooking] = useAddBookingMutation();
  const [addCart] = useAddAddCartMutation();

  const handleBooking = () => {
    const { userId } = getUserInfo() as any; // Replace with actual userId
    if (!userId) {
      message.error("please login ");
      router.push("/login");
    } else {
      setIsModalVisible(true);
    }
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

  const handleAddToCart = async () => {
    try {
      const { userId } = getUserInfo() as any;
      if (!userId) {
        message.error("please login ");
        router.push("/login");
      } else {
        // Assuming you have a service object. Modify this accordingly.
        const serviceToAddToCart = {
          serviceId: service.id,
          userId: userId, // You can modify this as needed.
        };

        const res = await addCart(serviceToAddToCart).unwrap();

        if (res.id) {
          message.success("Service added to cart successfully.");
        } else {
          message.error("Failed to add service to cart.");
        }
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      message.error("An error occurred while adding to cart.");
    }
  };

  return (
    <Card
      hoverable
      style={{
        width: 300,
        height: "380px",
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
              Status:
            </Text>{" "}
            {service.status}
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
        <div className="mx-1">
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
        <div>
          <Link key={service.id} href={`services/${service.id}`}>
            <Button>Details</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;

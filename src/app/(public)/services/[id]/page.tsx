"use client";
import Loading from "@/app/loading";
import BookingModal from "@/components/ui/BookingModal";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import {
  useAddReviewAndRatingMutation,
  useReviewAndRatingServiceIdQuery,
} from "@/redux/api/reviewRatingApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import {
  Button,
  Card,
  Image,
  List,
  Rate,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const { Title, Paragraph } = Typography;

const ServiceDetailsPage = ({ params }: any) => {
  const { id } = params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const { data, isLoading } = useServiceQuery(id);
  const [addBooking] = useAddBookingMutation();
  const [addReviewAndRating] = useAddReviewAndRatingMutation();

  const { data: reviewsAndRatings, isLoading: reviewLoading } =
    useReviewAndRatingServiceIdQuery(id);

  if (reviewLoading) {
    return <Loading />;
  }

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
    return <Loading />;
  }

  const service = data;

  if (!service) {
    return null; // Service not found
  }

  const handleRatingChange = (value: number) => {
    console.log(value);
    setRating(value);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setReview(e.target.value);
  };

  const handleReviewSubmit = async () => {
    try {
      if (!review || rating === 0) {
        message.error("Please provide a review and rating.");
        return;
      }

      const { userId } = getUserInfo() as any; // Replace with actual userId

      const res = await addReviewAndRating({
        review,
        rating,
        userId,
        serviceId: id,
      }).unwrap();

      if (res.id) {
        message.success("Review and rating submitted successfully.");

        // Clear the review and rating inputs
        setReview("");
        setRating(0);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

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
                <div className="flex">
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
                    <Button>Add to Card</Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span>Rate this service:</span>
              <Rate value={rating} onChange={handleRatingChange} />
            </div>

            {/* Review */}
            <div style={{ marginTop: "10px" }}>
              <TextArea
                rows={4}
                placeholder="Write a review"
                value={review}
                onChange={handleReviewChange}
              />
            </div>

            {/* Submit Review button */}
            <Button
              className="mt-2"
              type="primary"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </Button>

            {/* Display reviews and ratings */}
            <div style={{ marginTop: "20px" }}>
              <List
                itemLayout="horizontal"
                dataSource={reviewsAndRatings}
                renderItem={(item: any) => (
                  <List.Item>
                    <List.Item.Meta
                      title={<span>{item.review}</span>}
                      description={
                        <div>
                          <Rate value={item.rating} disabled />
                          <span> - {item.createdAt}</span>
                          <p>Service: {item.service.title}</p>
                          <p>Description: {item.service.description}</p>
                          <p>Price: ${item.service.price}</p>
                          <p>
                            Availability:{" "}
                            {item.service.availability
                              ? "Available"
                              : "Not Available"}
                          </p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        )}
      </Spin>
    </div>
  );
};

export default ServiceDetailsPage;

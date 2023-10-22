"use client";
import Loading from "@/app/loading";
import { useContentsQuery } from "@/redux/api/contentApi";
import { CalendarOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
const BlogCard = () => {
  const { data: blogs, isLoading } = useContentsQuery({});

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Row
        style={{
          height: "100%",
        }}
        gutter={[20, 20]}
      >
        {blogs?.map((blog: any, i: number) => (
          <Col
            style={{
              marginBottom: "20px",
            }}
            key={i}
            span={8}
          >
            <Card
              hoverable
              style={{ width: 340 }}
              cover={<Avatar shape={"square"} size={340} src={blog?.image} />}
            >
              <p
                style={{
                  color: "gray",
                  marginBottom: "10px",
                }}
              >
                <CalendarOutlined
                  style={{
                    color: "green",
                    marginRight: "10px",
                  }}
                />
                {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                })}
              </p>
              <Meta
                title={blog?.title}
                description={blog?.body.slice(0, 240)}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogCard;

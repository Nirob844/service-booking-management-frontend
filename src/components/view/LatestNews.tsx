"use client";
import Loading from "@/app/loading";
import { useContentsQuery } from "@/redux/api/contentApi";
import { CalendarOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";

const LatestNewsPage = () => {
  const { data, isLoading } = useContentsQuery({ limit: 4, sortOrder: "desc" });
  const blogs = data?.contents;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="m-10">
      <h1 className="mt-5 mb-5 text-center">Latest Blog</h1>
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
            sm={24} // 2 columns on small screens
            md={12} // 3 columns on medium screens
            lg={8} // 4 columns on large screens
            xl={6}
          >
            <Card
              hoverable
              className="m-3 lg:w-[300px]"
              cover={<Avatar shape={"square"} size={300} src={blog?.image} />}
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

export default LatestNewsPage;

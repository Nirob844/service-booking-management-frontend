"use client";
import {
  ContactsOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Col, Divider, Layout, Row, Space, Typography } from "antd";
import React from "react";

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterComponent: React.FC = () => {
  const iconSize = { fontSize: "24px" };
  return (
    <Footer style={{ backgroundColor: "#001f3f", color: "white" }}>
      <Row justify="center" align="middle">
        <Col span={12}>
          <Title level={3} style={{ color: "white" }}>
            Car Repairing
          </Title>
          <Text style={{ color: "white" }}>
            This is one of the best Car Repairing Application in Bangladesh.
          </Text>
        </Col>
        <Col span={8}>
          <Title level={3} style={{ color: "white" }}>
            Quick Links
          </Title>
          <ul>
            <li>
              <a href="/about" style={{ color: "white" }}>
                About Us
              </a>
            </li>
            <li>
              <a href="/services" style={{ color: "white" }}>
                Our Services
              </a>
            </li>
            <li>
              <a href="/categories" style={{ color: "white" }}>
                Our Categories
              </a>
            </li>
          </ul>
        </Col>
        <Col span={4}>
          <Space style={{ textAlign: "center" }}>
            <a href="https://github.com/Nirob844" style={{ color: "white" }}>
              <GithubOutlined style={iconSize} />
            </a>
            <a
              href="https://www.linkedin.com/in/nirob-hasan-156ab9258/"
              style={{ color: "white" }}
            >
              <LinkedinOutlined style={iconSize} />
            </a>
            <a
              href="https://portfolio-nextjs-main-nine.vercel.app/"
              style={{ color: "white" }}
            >
              <ContactsOutlined style={iconSize} />
            </a>
          </Space>
        </Col>
      </Row>
      <Divider style={{ background: "white" }} />
      <p style={{ textAlign: "center", color: "white" }}>
        &copy; {new Date().getFullYear()} Car Repairing. All rights reserved.
      </p>
    </Footer>
  );
};

export default FooterComponent;

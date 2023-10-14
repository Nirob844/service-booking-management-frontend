"use client";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Service Booking &copy; {new Date().getFullYear()} Created by ant design
    </Footer>
  );
};

export default FooterComponent;

import { Layout } from "antd";

const { Footer } = Layout;

const LayoutFooter = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Service Booking &copy; {new Date().getFullYear()} Created by ant design
    </Footer>
  );
};

export default LayoutFooter;

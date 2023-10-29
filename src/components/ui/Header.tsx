"use client";
import { authKey } from "@/constants/storageKey";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import {
  AppstoreAddOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Row, Space } from "antd";
import { useRouter } from "next/navigation";
const { Header: AntHeader } = Layout;

const Header = () => {
  const { data, isLoading } = useProfileQuery(undefined);
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      text: "Home",
      onClick: () => {
        router.push("/home"); // Replace this with your actual home route
      },
    },
    {
      key: "services",
      icon: <AppstoreAddOutlined />,
      text: "Services",
      onClick: () => {
        router.push("/services"); // Replace this with your actual services route
      },
    },
    {
      key: "signOut",
      icon: <LogoutOutlined />,
      text: "Sign Out",
      onClick: logOut,
    },
  ];

  const menu = (
    <Menu>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
          {item.text}
        </Menu.Item>
      ))}
    </Menu>
  );

  const { role } = getUserInfo() as any;

  return (
    <AntHeader style={{ background: "#fff" }}>
      <Row justify="end">
        <Space align="end">
          {role ? (
            <Dropdown overlay={menu}>
              <Space wrap size={16}>
                {data?.image ? (
                  <Avatar size="large" src={data.image} />
                ) : (
                  <Avatar size="large" icon={<UserOutlined />} />
                )}
              </Space>
            </Dropdown>
          ) : (
            <Button type="text" onClick={() => router.push("/login")}>
              Sign In
            </Button>
          )}
        </Space>
      </Row>
    </AntHeader>
  );
};

export default Header;

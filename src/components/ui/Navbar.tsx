"use client";
import { authKey } from "@/constants/storageKey";
import { useProfileQuery } from "@/redux/api/profileApi";
import { useAppDispatch } from "@/redux/hooks";
import { showSidebarDrawer } from "@/redux/slice/sidebarSlice";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import {
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Space,
  Typography,
} from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Header, Content } = Layout;
const { Title } = Typography;

const Navbar = ({
  items,
  hasSider,
}: {
  items: { key: string; label: string; href: string }[];
  hasSider?: boolean;
}) => {
  const { role } = getUserInfo() as any;
  const { data, isLoading } = useProfileQuery(undefined);
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Define your menu items for the dropdown
  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  // Define your menu items for the dropdown
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      text: "Dashboard",
      onClick: () => {
        router.push("/profile"); // Replace this with your actual profile route
      },
    },
    {
      key: "signOut",
      icon: <LogoutOutlined />,
      text: "Sign Out",
      onClick: logOut,
    },
  ];
  // Define the menu for the dropdown
  const menu = (
    <Menu>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
          {item.text}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Layout className="layout">
      <Header className="flex items-center">
        {hasSider && (
          <Button
            type="primary"
            className="lg:hidden"
            onClick={() => {
              dispatch(showSidebarDrawer());
            }}
          >
            <MenuOutlined />
          </Button>
        )}
        <Content>
          <Link href="/">
            <Title
              className={`m-0 text-white ${
                hasSider && "text-center lg:text-left"
              }`}
            >
              Car Repairing
            </Title>
          </Link>
        </Content>
        <Menu
          className="lg:block hidden"
          disabledOverflow
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
        >
          {items?.map((item) => (
            <Menu.Item key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </Menu.Item>
          ))}
          {role ? (
            <Menu.Item key="userProfile">
              <Dropdown overlay={menu}>
                <Space wrap size={16}>
                  {data?.image ? (
                    <Avatar size="large" src={data.image} />
                  ) : (
                    <Avatar size="large" icon={<UserOutlined />} />
                  )}
                </Space>
              </Dropdown>
            </Menu.Item>
          ) : (
            <Menu.Item key="signIn" onClick={() => router.push("/login")}>
              Sign In
            </Menu.Item>
          )}
        </Menu>

        <Button type="primary" className="lg:hidden" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer title="Menu" placement="right" onClose={onClose} visible={open}>
          <Menu
            theme="light"
            mode="vertical"
            selectedKeys={[pathname]}
            style={{ borderRight: 0 }}
          >
            {items?.map((item) => (
              <Menu.Item key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });

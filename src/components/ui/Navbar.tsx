"use client";
import { authKey } from "@/constants/storageKey";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, Typography } from "antd";
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
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout className="layout">
      <Header className="flex items-center">
        {hasSider && (
          <Button type="primary" className="lg:hidden" onClick={() => {}}>
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
              Service Booking
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
            <Button
              type="primary"
              onClick={() => {
                logOut();
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                router.push("/login");
              }}
            >
              Sign In
            </Button>
          )}
        </Menu>

        <Button type="primary" className="lg:hidden" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer title="Menu" placement="right" onClose={onClose}>
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

export default Navbar;
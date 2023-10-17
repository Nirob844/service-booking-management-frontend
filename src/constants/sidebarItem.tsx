import {
  AppstoreOutlined,
  ProfileOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItem = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
      ],
    },
  ];

  // const commonAdminSidebarItems: MenuProps["items"] = [
  //   {
  //     label: <Link href={`/${role}/manage-user`}>Manage User</Link>,
  //     icon: <TableOutlined />,
  //     key: `/${role}/manage-user`,
  //   },
  // ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/categories`}>Manage Category</Link>,
          key: `/${role}/categories`,
        },
        {
          label: <Link href={`/${role}/services`}>Manage Service</Link>,
          key: `/${role}/services`,
        },
        {
          label: <Link href={`/${role}/bookings`}>Manage Booking</Link>,
          key: `/${role}/bookings`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...adminSidebarItems,

    // {
    //   label: <Link href={`/${role}/user`}>Manage User</Link>,
    //   icon: <TableOutlined />,
    //   key: `/${role}/user`,
    // },
    // {
    //   label: "Management",
    //   key: "management",
    //   icon: <AppstoreOutlined />,
    //   children: [
    //     {
    //       label: <Link href={`/${role}/categories`}>Manage Category</Link>,
    //       key: `/${role}/categories`,
    //     },
    //     {
    //       label: <Link href={`/${role}/services`}>Manage Service</Link>,
    //       key: `/${role}/services`,
    //     },
    //     {
    //       label: <Link href={`/${role}/bookings`}>Manage Booking</Link>,
    //       key: `/${role}/bookings`,
    //     },
    //   ],
    // },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else {
    return defaultSidebarItems;
  }
};

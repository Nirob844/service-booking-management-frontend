import { getUserInfo } from "@/services/auth.service";
import Navbar from "../ui/Navbar";

const PublicHeader = () => {
  const { role } = getUserInfo() as any;
  console.log(role);
  const items = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Services", href: "/services" },
    { key: "4", label: "About Us", href: "/about-us" },
    { key: "5", label: "Blog", href: "/blogs" },
    { key: "5", label: "Profile", href: "/profile" },
  ];
  return (
    <>
      <Navbar items={items} />
    </>
  );
};

export default PublicHeader;

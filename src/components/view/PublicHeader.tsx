import Navbar from "../ui/Navbar";

const PublicHeader = () => {
  const items = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Services", href: "/services" },
    { key: "4", label: "About Us", href: "/about" },
    { key: "5", label: "Blog", href: "/blogs" },
    { key: "5", label: "Faq", href: "/faqs" },
  ];
  return (
    <>
      <Navbar items={items} />
    </>
  );
};

export default PublicHeader;

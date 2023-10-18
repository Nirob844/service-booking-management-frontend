import FooterComponent from "@/components/ui/Footer";
import PublicHeader from "@/components/view/PublicHeader";
import HomePage from "./(public)/home/page";

const RootPage = () => {
  return (
    <div>
      <PublicHeader />
      <HomePage />
      <FooterComponent />
    </div>
  );
};

export default RootPage;

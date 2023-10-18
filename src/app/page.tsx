import Banner from "@/components/ui/Banner";
import FooterComponent from "@/components/ui/Footer";
import PublicHeader from "@/components/view/PublicHeader";

const HomePage = () => {
  return (
    <div>
      <PublicHeader />
      <div className="min-h-[calc(100vh-64px)]">
        <Banner />
      </div>
      <FooterComponent />
    </div>
  );
};

export default HomePage;

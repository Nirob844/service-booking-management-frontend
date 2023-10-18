import Banner from "@/components/ui/Banner";
import About from "../about/page";

const HomePage = () => {
  return (
    <div>
      <div className="min-h-[calc(100vh-64px)]">
        <Banner />
        <About />
      </div>
    </div>
  );
};

export default HomePage;

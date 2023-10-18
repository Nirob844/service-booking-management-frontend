import Banner from "@/components/ui/Banner";
import FeedbackForm from "@/components/view/Feedback";
import LatestServicePage from "@/components/view/LatestService";
import About from "../about/page";

const HomePage = () => {
  return (
    <div>
      <div className="min-h-[calc(100vh-64px)]">
        <Banner />
        <About />
        <LatestServicePage />
        <FeedbackForm />
      </div>
    </div>
  );
};

export default HomePage;

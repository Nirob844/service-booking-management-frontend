import Banner from "@/components/ui/Banner";
import FaqForm from "@/components/view/Faq";
import FeedbackForm from "@/components/view/Feedback";
import LatestServicePage from "@/components/view/LatestService";
import UpcomingServicePage from "@/components/view/UpcomingService";
import About from "../about/page";

const HomePage = () => {
  return (
    <div>
      <div className="min-h-[calc(100vh-64px)]">
        <Banner />
        <LatestServicePage />
        <About />
        <UpcomingServicePage />
        <FeedbackForm />
        <FaqForm />
      </div>
    </div>
  );
};

export default HomePage;

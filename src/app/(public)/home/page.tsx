import Banner from "@/components/ui/Banner";
import FaqForm from "@/components/view/Faq";
import FeedbackForm from "@/components/view/Feedback";
import LatestNewsPage from "@/components/view/LatestNews";
import LatestServicePage from "@/components/view/LatestService";
import UpcomingServicePage from "@/components/view/UpcomingService";
import About from "../about/page";
import CategoryCard from "../categories/page";
import FaqPage from "../faqs/page";

const HomePage = () => {
  return (
    <div>
      <div className="min-h-[calc(100vh-64px)]">
        <Banner />
        <CategoryCard />
        <About />
        <LatestServicePage />
        <UpcomingServicePage />
        <LatestNewsPage />
        <FeedbackForm />
        <FaqForm />
        <FaqPage />
      </div>
    </div>
  );
};

export default HomePage;

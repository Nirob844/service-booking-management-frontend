"use client";
import Loading from "@/app/loading";
import Card from "@/components/ui/Card";
import { useServicesQuery } from "@/redux/api/serviceApi";

const UpcomingServicePage = () => {
  const { data: upcomingServices, isLoading } = useServicesQuery({
    sortOrder: "desc",
    limit: 4,
    status: "upcoming",
  });

  // const upcomingServices = data?.services
  //   ?.filter((service) => service.status === "upcoming")
  //   .slice(0, 3);

  return (
    <div className="m-10">
      <div className="">
        <h1 className="mt-5 mb-2 text-center">Upcoming Service</h1>
        <div>
          {isLoading ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-x-5 gap-y-5">
              {upcomingServices?.services?.map((service) => {
                return <Card key={service.id} service={service} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingServicePage;
